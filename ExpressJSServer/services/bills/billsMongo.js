var express = require('express');
var bills = express.Router();
var fs = require('fs');

const Bills = require('.././model/bills');
const Shirts = require('.././model/shirts');
const Users = require('.././model/users');
const Orders = require('.././model/orders');

var ObjectId = require('mongoose').Types.ObjectId;

const fileFn = (id_name, fileuploads, prototype) => {
    try {
        var base64String = fileuploads;
        let base64Data = base64String.split(';base64,').pop();
        let type = base64String.split(';', 1);
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let result_type = type[0].slice(11);

        const folderName = `./public/payments`;
        const component_folder = `/component`;
        try {
            if (!fs.existsSync(folderName)) {
                const path_ = folderName + component_folder;

                fs.mkdirSync(folderName + component_folder, { recursive: true });
            }
        } catch (err) {
            console.error(err);
        }
        const name_ = `${id_name}`;
        const path_ = `${folderName}/${name_}.png`;

        fs.writeFile(path_, base64Data, 'base64', function (err) {
            if (err) console.log(err);
            fs.readFile(path_, function (err, data) {
                if (err) throw err;
                console.log("Upload Done")
            });
        });

        return name_;

    }
    catch (e) {

        console.log("error")
    }
};







bills.get('/historybills/:user_id?', async (req, res, next) => {

    let user_id = ObjectId(req.params.user_id)

    try {

        let usersProfile = await Users.aggregate([
            {
                $lookup: {
                    from: "shirts",
                    localField: "_id",
                    foreignField: "user_id",
                    let: { user_id: "$_id" },
                    pipeline:
                        [
                            {
                                $project: {

                                    "nameshirt_": 1,
                                }
                            }, {
                                $match:
                                {
                                    $expr:
                                    {
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "orders",

                                    as: "Orders",
                                    pipeline: [{
                                        $match: {
                                            $expr:
                                            {

                                                $eq: ["$$user_id", "$user_id"]


                                            }
                                        }

                                    }],
                                }
                            },
                            {
                                $lookup: {
                                    from: "bills",
                                    let: { shirt_id: "$_id" },
                                    as: "ShirtsBills",
                                    pipeline: [{
                                        $match: {

                                            "ShirtsBills.listbills": { $ne: [] },
                                            $expr:
                                            {
                                                /*
                                              $eq: ["$$shirt_id", "$shirts.shirt_id"]
                                                      "listbills.0": { "$exists": true },
                                                */
                                            }
                                        }
                                    }, {
                                        $project: {

                                            listbills: {
                                                $filter: {
                                                    input: "$shirts",
                                                    as: "item",
                                                    cond: {
                                                        $eq: ["$$item.shirt_id", "$$shirt_id"],
                                                    }
                                                },

                                            },
                                            test: "$listbills.size"
                                        }
                                    },

                                    ],
                                }
                            }



                        ]

                    ,
                    as: "Shirts",
                }
            }, {
                $sort: {_id:-1}
            },{
                $match: {
                    _id: user_id,

                }
            }, { $project: { "Shirts": 1, "Shirts": { "Orders": 0 } } }]);
        console.log(usersProfile)
        res.json(usersProfile)
        /*  Bills.find({ user_id: user_id }).then(async (bill) => {
  
              for (let i in bill) {
                  console.log(bill[i].shirts)
              }
              //Shirts.find({})
  
              res.send(bill)
          }) */
    } catch (err) {
        console.log(err)
    } finally {

    }


});



bills.post('/payment/:_id?', async (req, res) => {
    console.log(req.body.bill_id);
    console.log(req.body.bank);
    console.log(req.body.total);
    const test = fileFn(req.body.bill_id, req.body.img, 'img')

    //we are giving a url for an image as second parameter below
    let update = { payments: { payment: test, bank: req.body.bank.bank, total: req.body.total } }
    console.log(test);
    await Bills.updateOne({ _id: ObjectId(req.body.bill_id) }, update).then((bill) => {
        Orders.updateOne({ bill_id: ObjectId(req.body.bill_id) }, { state: "กำลังตรวจสอบ" }).then((order) => {

            res.status(200).json(order)
        })
    })


});


bills.get('/payment/:bill_id?', async (req, res, next) => {

    let bill_id = ObjectId(req.params.bill_id)
    res.send(`<img src="http://192.168.1.23:3000/payments/${req.params.bill_id}.png" >`)


});


module.exports = bills;