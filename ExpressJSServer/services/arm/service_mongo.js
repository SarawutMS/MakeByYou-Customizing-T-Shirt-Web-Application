var express = require('express');
var service = express.Router();
const multer = require('multer');
var fs = require('fs');
const mongoose = require('mongoose');
const { response } = require('../../app');
//var ObjectID = require('mongoose').ObjectID;
var url = "mongodb://localhost:27017/Database";
var uploads = multer()
var ObjectId = require('mongoose').Types.ObjectId;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './mongo_db/img')
    },
    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/').reverse()[0])
    }
})


survey_data = async (collection, data) => {
    let check = "";
    let test = mongoose.connect(url, (err, db) => {
        if (err) throw err;
        db.collection(collection).find({}).toArray(function (err, result) {
            if (err) throw err;
            let email = "parnsa-ard@hotmail.com";
            for (i in result) {
                if (result[i].email == data) {
                    check = "err";
                }
            }


            return true;
        });

    });

    return check;
}
/* GET home page. */
service.get('/', function (req, res, next) {

    mongoose.connect(url, function (err, db) {
        if (err) throw err;
    res.send('sd')


    });

});

var register = multer()
service.post('/registers', register.none(), (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const last_name = req.body.last_name;
    const pass = req.body.pass;
    mongoose.connect(url, function (err, db) {
        if (err) throw err;
        var myobj = {
            email: email,
            name: name,
            last_name: last_name,
            password: pass,
            zipcode: '',
            address1: '',
            address2: '',
            more: '',
        };


    });
});



service.post('/upload', uploads.single('fileupload'), (req, res) => {
    try {
        var base64String = req.body.fileuploads;
        let base64Data = base64String.split(';base64,').pop();
        let type = base64String.split(';', 1);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //let ts = type.split('/');
        let result_type = type[0].slice(11);


        const folderName = `./services/arm/mongo_db/${req.body.name}/${req.body.count}`;
        const component_folder = `/component`;
        try {
            if (!fs.existsSync(folderName)) {
                const path_ = folderName + component_folder;

                fs.mkdirSync(folderName + component_folder, { recursive: true });
            }
        } catch (err) {
            console.error(err);
        }
        fs.writeFile(`${folderName}/${uniqueSuffix}_shirt.${result_type}`, base64Data, 'base64', function (err) {
            if (err) console.log(err);
            fs.readFile(`${folderName}/${uniqueSuffix}_shirt.${result_type}`, function (err, data) {
                if (err) throw err;
                res.send("Upload Done");
            });
        });


        fs.writeFile(`${folderName}${component_folder}/${uniqueSuffix}_shirt.svg`, req.body.svg, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved

        });
    }
    catch (e) {
        //  Block of code to handle errors

        res.send(e)
    }

})
const fileFn = (id_name, fileuploads, prototype) => {
    try {
        var base64String = fileuploads;
        let base64Data = base64String.split(';base64,').pop();
        let type = base64String.split(';', 1);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let result_type = type[0].slice(11);

        const folderName = `./public/images`;
        const component_folder = `/component`;
        try {
            if (!fs.existsSync(folderName)) {
                const path_ = folderName + component_folder;

                fs.mkdirSync(folderName + component_folder, { recursive: true });
            }
        } catch (err) {
            console.error(err);
        }
        const name_ = `${id_name}_${uniqueSuffix}${prototype}_shirt`;
        const path_ = `${folderName}/${name_}.${result_type}`;

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
var create = multer()

service.post('/createorders', (req, res, next) => {
    var cart_id = new ObjectId(req.body._idcart);

    mongoose.connect(url, (err, db) => {
        db.collection("carts").find({ _id: cart_id }).toArray((err, result) => {
            if (err) throw err;

            const date = new Date();
            const day = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            const time = `${date.getHours()}:${date.getMinutes()}`;
            db.collection('bills').insertOne(result[0], function (err, ress) {
                if (err) throw err;

                var order = {
                    state: false,
                    bill_id: ress.insertedId,
                    date: day.toString(),
                    time: time.toString(),
                    user_id: result[0].user_id,
                };
                db.collection('orders').insertOne(order, function (err, results) {
                    if (err) throw err;

                    db.collection('carts').deleteOne({ _id: result[0]._id }, function (err, results) {
                        if (err) throw err;

                        res.send("Success");

                    });

                });
            });




        });
    });

});





service.get('/order/:_id/:tool', (req, res, next) => {
    var user_id = new ObjectId(req.params._id);


    let String = req.params.tool;
    let tool_id = String.split(':')



    mongoose.connect(url, (err, db) => {

        switch (tool_id[0]) {
            case 'delete':
                db.collection('orders').deleteOne({ _id: new ObjectId(tool_id[1]) }, function (err, results) {
                    if (err) throw err;

                    res.send(results);

                });
                break
            case 'page':

                db.collection("orders").find({ user_id: user_id }).sort({ _id: -1 }).toArray((err, result) => {
                    if (err) throw err;
                    res.send(result);

                });
                break

            case 'customer':
                db.collection("orders").find({ state: true }).toArray((err, orders) => {
                    if (err) throw err;
                    let data = {};
                    let test = []
                    db.collection("bills").find().toArray((err, bill) => {
                        if (err) throw err;
                        db.collection("shirts").find().toArray((err, shirt) => {
                            if (err) throw err;
                            let sizes = { 'XS': 0, 'S': 0, 'M': 0, 'L': 0, 'XL': 0 }
                            let price = 0;
                            for (let order in orders) {
                                for (let items in bill) {
                                    for (let shirtc in bill[items].shirts) {
                                        for (let sh in shirt) {
                                            if (orders[order].bill_id.toString() == bill[items]._id.toString()) {
                                                if (bill[items].shirts[shirtc].shirt_id.toString() == shirt[sh]._id.toString()) {
                                                    for (let size in sizes) {
                                                        sizes[size] += bill[items].shirts[shirtc][size].count * bill[items].shirts[shirtc][size].price_size
                                                        price += bill[items].shirts[shirtc][size].count * bill[items].shirts[shirtc][size].price_size;
                                                    }



                                                    if (shirt[sh].users_id.toString() == user_id.toString()) {
                                                        test.push({ 'order_id': orders[order].bill_id, 'time': orders[order].time, 'date': orders[order].date, '_nameshirt': shirt[sh].nameshirt_, 'price': bill[items].shirts[shirtc].aprice })

                                                    }

                                                }
                                            }

                                        }




                                    }
                                }
                            }





                            data = test;


                            res.send(data);

                        });





                    });
                });
                break
        };





    });

});


service.get('/orderselled/:_id', (req, res, next) => {
    var user_id = new ObjectId(req.params._id);





    mongoose.connect(url, (err, db) => {


        db.collection('shirts').find({ users_id: user_id, nameshirt_: { $not: { $regex: "null" } } }).toArray((err, data) => {
            if (err) throw err;



            res.send(shuffle(data));



        })
    });

});


service.post('/create_shirt', create.none(), (req, res, next) => {
    mongoose.connect(url, (err, db) => {
        if (err) throw err;
        let _id = req.body.user_id;
        let color = req.body.color;
        let _type = req.body.type_shirt;
        const front_path = fileFn(_id, req.body.front, 'front')
        const back_path = fileFn(_id, req.body.back, 'back')
        const edit_front = req.body.for_edit;

        let permission = req.body.permission;
        if (permission === 'false') {
            permission = '';
        }

        var myobj = {
            nameshirt_: req.body.nameshirt_,
            shirt_path: { "front": front_path, "back": back_path, "edit_front": edit_front },
            property: { "_type": _type, "color": color },
            detail: req.body.detail,
            user_id: new ObjectId(_id),
            permission: Boolean(permission),
        };
        db.collection('shirts').insertOne(myobj, function (err, result) {
            if (err) throw err;

            res.send(result);

        });





    });
});



//80%
service.post('/cart', (req, res, next) => {
    try {
        let count = 0;
        let total = 0
        let data = req.body.shirts;
        console.log(req.body.user_id)
        for (let i in data) {
            if (i != 'shirt_id' && i != 'aprice') {

                count += data[i].count;
                total += data[i].count * data[i].price_size
            }
        }
        data['shirt_id'] = new ObjectId(data['shirt_id']);
        var myobj = {
            shirts: [data],

            user_id: new ObjectId(req.body.user_id),
        };
        mongoose.connect(url, (err, db) => {


            db.collection('carts').find({ user_id: new ObjectId(req.body.user_id) }).toArray((err, result) => {
                if (err) throw err;

                if (result == "") {

                    db.collection('carts').insertOne(myobj, function (err, data) {
                        if (err) throw err;

                        res.send(data);

                    });
                }
                else {
                    for (let old in result) {
                        for (let item in result[old].shirts) {

                            if (String(result[old].shirts[item].shirt_id) == String(data['shirt_id'])) {

                                continue;
                            } else {
                                myobj.shirts.push(result[old].shirts[item]);
                            }


                        }
                    }
                    const _id = new ObjectId(result[0]._id);
                    db.collection("carts").updateOne({ _id: _id }, { $set: { shirts: myobj.shirts, } }, function (err, data) {
                        if (err) throw err;
                        res.send(data);

                    });

                }
            });


        });


    }
    catch (err) {
        res.send(err);
    }


});

service.post('/cartdelete', (req, res, next) => {
    try {


        var _id = new ObjectId(req.body.user_id);


        console.log(req.body.shirt_id)

        mongoose.connect(url, (err, db) => {
            let myobj = [];



            var shirt_id = new ObjectId(req.body.shirt_id);

            db.collection("shirts").find({ _id: shirt_id }).toArray((err, result) => {

                if (err) throw err;

                if (result[0].nameshirt_ == "Unknow") {
                    db.collection('shirts').deleteOne({ _id: shirt_id }, function (err, results) {
                        if (err) throw err;



                    });

                }

            });



            db.collection("carts").find({ user_id: _id }).toArray((err, result) => {
                if (err) throw err;


                for (let item in result[0].shirts) {

                    if (result[0].shirts[item].shirt_id == req.body.shirt_id) {
                        continue;
                    } else {
                        myobj.push(result[0].shirts[item]);
                    }

                }





                db.collection("carts").updateOne({ _id: result[0]._id }, { $set: { shirts: myobj } }, function (err, data) {
                    if (err) throw err;














                    res.send(data);
                });


            });

            /* */

        });


    }
    catch (err) {
        res.send(err);
    }
});







service.get('/own_shirts/:_id/:permission', (req, res, next) => {
    try {
        mongoose.connect(url, (err, db) => {
            var user_id = new ObjectId(req.params._id);
            let data = [];
            let filter = { users_id: user_id, nameshirt_: { $not: { $regex: "null" } } }
            if (req.params.permission == 'true') {
                filter = { users_id: user_id, permission: 'true', nameshirt_: { $not: { $regex: "null" } } }
            }
            db.collection("shirts").find(filter).toArray((err, result) => {
                if (err) throw err;
                res.send(result);

            });
        });
    }
    catch (err) {
        res.send(err);
    }




});

service.get('/searchshirt/:_id', (req, res, next) => {
    try {

        mongoose.connect(url, (err, db) => {
            var shirt_id = new ObjectId(req.params._id);
            let data = [];
            db.collection("shirts").find({ users_id: shirt_id, permission: 'true' }).toArray((err, result) => {

                if (err) throw err;
                res.send(result);

            });
        });
    }
    catch (err) {
        res.send(err);
    }




});


service.get('/buynow/:_id', (req, res, next) => {
    try {

        mongoose.connect(url, (err, db) => {
            var shirt_id = new ObjectId(req.params._id);
            let data = [];
            db.collection("shirts").find({ _id: shirt_id }).toArray((err, result) => {

                if (err) throw err;
                res.send(result[0]);

            });
        });
    }
    catch (err) {
        res.send(err);
    }




});

service.get('/delshirts/:_id', (req, res, next) => {
    try {

        mongoose.connect(url, (err, db) => {
            var shirt_id = new ObjectId(req.params._id);

            db.collection('shirts').deleteOne({ _id: shirt_id }, function (err, results) {
                if (err) throw err;

                res.send("Success");

            });
        });
    }
    catch (err) {
        res.send(err);
    }




});



service.post('/user', (req, res, next) => {
    var _id = new ObjectId(req.body.user_id);
    mongoose.connect(url, (err, db) => {
        if (req.body.tool) {

            var newvalues = { $set: { zipcode: req.body.zipcode, address1: req.body.address1, address2: req.body.address2, more: req.body.more, } };

            db.collection("users").updateOne({ _id: _id }, newvalues, function (err, data) {
                if (err) throw err;





                db.collection("users").find({ _id: _id }).toArray((err, result) => {
                    if (err) throw err;
                    res.send(result);

                });


            });
        } else {

            db.collection("users").find({ _id: _id }).toArray((err, result) => {
                if (err) throw err;
                res.send(result);

            });

        }





    });
});

service.get('/store/:_id', (req, res, next) => {
    var user_id = new ObjectId(req.params._id);
    mongoose.connect(url, (err, db) => {
        db.collection("users").find({ _id: user_id }).toArray((err, result) => {
            if (err) throw err;
            res.send(result);

        });
    });

});


service.get('/users', (req, res, next) => {
    mongoose.connect(url, (err, db) => {
        db.collection("shirts").find({ permission: 'true' }).toArray((err, shirt) => {
            if (err) throw err;

            db.collection("users").find({}).toArray((err, result) => {
                if (err) throw err;
                let arr = [];
                let resR = [];
                for (let c in shirt) {
                    arr.push(shirt[c].users_id.toString());
                }
                let uniqueChars = [...new Set(arr)];

                for (let i in result) {
                    for (let c in uniqueChars) {
                        if (result[i]._id.toString() == uniqueChars[c]) {
                            resR.push(result[i]);
                        }
                    }
                }


                res.send(shuffle(resR));



            });


        });


    });

});

service.post('/:ev', (req, res, next) => {

    mongoose.connect(url, (err, db) => {
        if (err) throw err;
        console.log(req.params.ev);
        switch (req.params.ev) {
            case "logins":

                let check = false;

                db.collection('users').find(req.body).toArray(function (err, result) {



                    if (result.length != 0) {
                        res.send({ state: true, _id: result[0]._id, data: result[0] })
                    } else {
                        res.send(check);
                    }

                });
                break
            case "carts":
                let size = ''
                //Get size in side arr


                let query = {
                    //  _id:local
                    user_id: new ObjectId(req.body.own_user._id),
                    shirt: { shirt_id: new ObjectId(req.body.cartSide.shirt_id), size: req.body.cartSide.size },
                    count: req.body.cartSide.count,
                }

                db.collection("carts").find({ shirt: query.shirt }).toArray(function (err, result) {
                    if (err) throw err;

                    if (result.length == 0) {
                        db.collection("carts").insertOne(query, function (err, re) {
                            if (err) throw err;
                            console.log("1 document creat ca");
                            res.send({ "success": true, _id: re.insertedId })
                        })
                    } else {
                        console.log(result[0]._id);
                        res.send({ type: "update", _id: result[0]._id })
                    }


                })

                break
            case "register":
                const newRegister = req.body;
                const registerCheck = { 'email': req.body.email }
                db.collection("users").find(registerCheck).toArray(function (err, result) {
                    if (err) throw err;

                    if (result.length == 0) {

                        db.collection("users").insertOne(newRegister, function (err, re) {
                            if (err) throw err;
                            console.log("1 document inserted");

                            res.send({ "success": true, _id: re.insertedId })
                        })
                    } else {
                        res.send(false)
                    }

                })
                break
            case "address":

                let newaddress = {}
                db.collection("address").insertOne(newaddress, function (err, re) {
                    if (err) throw err;
                    console.log("1 document address ");
                    res.send({ "success": true, _id: re.insertedId })
                })


                break

        };


    });




});

service.put('/update/:ev', (req, res, next) => {
    let cart_id = new ObjectId(req.params.ev)
    var newvalues = { $set: { count: req.body.cartSide.count } };

    mongoose.connect(url, (err, db) => {

        db.collection("carts").updateOne({ _id: cart_id }, newvalues, function (err, data) {
            if (err) throw err;
            console.log("1 document updated");

            console.log(data)



        });


    });




});

service.delete('/:page?/:_id?', (req, res, next) => {

    let _id = new ObjectId(req.params._id);
    console.log(_id);
    const extention = req.params.page;
    mongoose.connect(url, (err, db) => {

        switch (extention) {
            case 'carts':

                db.collection('carts').deleteOne({ _id: _id }, function (err, results) {
                    if (err) throw err;
                    res.send(results);
                });
                break;


        }
    });

});




service.get('/shirts/:pages?/:_id?', (req, res, next) => {
    mongoose.connect(url, (err, db) => {

        let control = { permission: true }

        const match = (ev, id) => {
            switch (ev) {
                case "profile":
                    db.collection('users').aggregate([
                        {
                            $lookup:
                            {
                                from: 'shirts',

                                localField: '_id',
                                foreignField: 'user_id',
                                pipeline: [
                                    {
                                        $match:
                                            { permission: true }
                                    }
                                ],
                                as: 'shirts'
                            }
                        }, {
                            $match: { _id: id }
                        },

                    ]).toArray(function (err, result) {
                        if (err) throw err;
                        console.log(result)
                        res.send(result)
                    });

                    break
                case "store":
                    db.collection('shirts').aggregate([
                        {
                            $lookup:
                            {
                                from: 'users',

                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'user'
                            }
                        }, {
                            $match: { _id: id }
                        },

                    ]).toArray(function (err, result) {
                        if (err) throw err;
                        console.log(result)
                        res.send(result)
                    });
                    break
                case "profile_own":
                    db.collection('users').aggregate([
                        {
                            $lookup:
                            {
                                from: 'shirts',
                                localField: '_id',
                                foreignField: 'user_id',
                                as: 'shirts'
                            }
                        }, {
                            $match: { _id: id }
                        },

                    ]).toArray(function (err, result) {
                        if (err) throw err;
                        console.log(result)
                        res.send(result)
                    });
                    break

            }
        }
        if (req.params.pages == 'store' || req.params.pages == "profile" || req.params.pages == "profile_own") {
            let id = new ObjectId(req.params._id)
            match(req.params.pages, id)
        } else {
            //Profile 
            db.collection("shirts").find(control).sort({ _id: -1 }).toArray((err, result) => {
                if (err) throw err;

                res.send(shuffle(result));
            });
        }



    });



});

service.get('/carts/:_id?', (req, res, next) => {

    mongoose.connect(url, (err, db) => {
        let id = new ObjectId(req.params._id)
        console.log(id)

        db.collection('carts').aggregate([
            {
                $lookup:
                {
                    from: 'shirts',
                    localField: 'shirt.shirt_id',
                    foreignField: '_id',
                    as: 'shirt_'
                }
            },

            { $match: { user_id: id } }


        ]).toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            res.send(result)
        });




    });

});

module.exports = service;
