var express = require('express');
var service = express.Router();
const multer = require('multer');
var fs = require('fs');
const mongoose = require('mongoose');
const e = require('express');
const { off } = require('process');
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
shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

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

    res.send("Logon")

});



var login = multer()

service.post('/login', login.none(), (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    mongoose.connect(url, (err, db) => {
        if (err) throw err;
        db.collection('users').find({ username: 'root' }).toArray(function (err, result) {

        
            if (result.lenght != 0) {

                res.send('login')
            } else {
                res.send('err')
            }
        });
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
fileFn = (id_name, fileuploads, prototype) => {
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
        // fs.writeFile(`${folderName}${component_folder}/${uniqueSuffix}_shirt.svg`, req.body.svg, (err) => {
        // throws an error, you could also catch it here
        //if (err) throw err;

        // success case, the file was saved

        //});
    }
    catch (e) {
        //  Block of code to handle errors
        console.log("error")
    }
};
var create = multer()
service.post('/create_shirt', create.none(), (req, res, next) => {


    mongoose.connect(url, (err, db) => {
        if (err) throw err;
        let id = "";

        db.collection("users").find({ email: req.body.email }).toArray((err, result) => {
            if (err) throw err;

            for (i in result) {
                id = result[i]._id;
            }



            let color = req.body.color;
            let _type = req.body.type_shirt;

            const front_path = fileFn(id, req.body.front, 'front')
            const back_path = fileFn(id, req.body.back, 'back')
            const edit_front = req.body.for_edit;
            var myobj = {

                nameshirt_: req.body.nameshirt_,
                shirt_path: { "front": front_path, "back": back_path, "edit_front": edit_front },
                property: { "_type": _type, "color": color },
                detail: req.body.detail,
                users_id: id,
                permission: req.body.permission,
            };
            db.collection('shirts').insertOne(myobj, function (err, result) {
                if (err) throw err;

                res.send(result);

            });


        })


    });
});

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




service.get('/orderselled/:_id', (req, res, next) => {
    var user_id = new ObjectId(req.params._id);





    mongoose.connect(url, (err, db) => {


        db.collection('shirts').find({ users_id: user_id, nameshirt_: { $not: { $regex: "null" } } }).toArray((err, data) => {
            if (err) throw err;



            res.send(shuffle(data));



        })
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

service.get('/cart/:_id', (req, res, next) => {
    let response = [];
    var _id = new ObjectId(req.params._id);

    mongoose.connect(url, (err, db) => {



        db.collection("carts").find({ user_id: _id }).toArray((err, result) => {

            if (err) throw err;
            db.collection('shirts').find({}).toArray((err, data) => {
                if (err) throw err;

                if (result[0] != undefined) {
                    for (let c in data) {
                        for (let i in result[0].shirts) {
                            if (String(result[0].shirts[i].shirt_id) == String(data[c]._id)) {
                                result[0].shirts[i]['path'] = data[c]
                            }

                        };
                    };

                }
                // result[0].shirts[i]['path'] = data;




                res.send(result);
            });

        });



    });



});



service.get('/shirts/:pages', (req, res, next) => {


    mongoose.connect(url, (err, db) => {
        if (req.params.pages == 'gallery') {
            db.collection("shirts").find({ permission: 'true' }).sort({ _id: -1 }).toArray((err, result) => {
                if (err) throw err;

                res.send(shuffle(result));

            });
        }
        else if (req.params.pages == 'home') {
            db.collection("shirts").find({ permission: 'true' }).sort({ _id: -1 }).limit(6).toArray((err, result) => {
                if (err) throw err;

                res.send(shuffle(result));

            });
        }

        else if (req.params.pages == 'gallery_home') {

            db.collection("users").find().toArray((err, result_) => {
                if (err) throw err;




                res.send(shuffle(result_));

            });


        }

    });

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



service.get('/store/:_id', (req, res, next) => {
    var user_id = new ObjectId(req.params._id);
    mongoose.connect(url, (err, db) => {
        db.collection("users").find({ _id: user_id }).toArray((err, result) => {
            if (err) throw err;
            res.send(result);

        });
    });

});






service.get('/result/:tables', (req, res, next) => {
    const table = req.params.tables;
    console.log(table)
    mongoose.connect(url, (err, db) => {
        db.collection(table).find({}).sort({ _id: -1 }).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
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


service.delete('/delete/:tables/:_id', (req, res, next) => {
    const table = req.params.tables;
    const _id = new ObjectId(req.params._id);
    mongoose.connect(url, (err, db) => {
        db.collection(table).deleteOne({ _id: _id }, function (err, results) {
            if (err) throw err;
            res.send("Delte Success");
        });
    });

});


service.put('/update/:tables', (req, res, next) => {
    const table = req.params.tables;
    const _id = new ObjectId(req.body[1]._id);

    var myquery = { _id: _id };
    var newvalues = { $set: req.body[0] };

    mongoose.connect(url, (err, db) => {
        db.collection(table).updateOne(myquery, newvalues, function (err, results) {
            if (err) throw err;
            res.send("Update Success");
        });
    });

});



module.exports = service;
