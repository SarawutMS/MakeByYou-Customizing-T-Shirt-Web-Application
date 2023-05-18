var express = require('express');
var shirts = express.Router();
var fs = require('fs');


const Shirts = require('.././model/shirts');

const fileFn = (id_name, fileuploads, prototype) => {
  console.log(fileuploads)
  try {
    var base64String = fileuploads;
    let base64Data = base64String.split(';base64,').pop();
    let type = base64String.split(';', 1);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let result_type = type[0].slice(11);

    const folderName = `./public/shirts`;
    const component_folder = `/component`;
    try {
      if (!fs.existsSync(folderName)) {
        const path_ = folderName + component_folder;

        fs.mkdirSync(folderName + component_folder, { recursive: true });
      }
    } catch (err) {
      console.error(err);
    }
    const name_ = `${id_name}_${uniqueSuffix}`;
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

const fileFnSVG = (name, fileuploads) => {
  try {

    const folderName = `./public/shirts/SVG`;
    const path_ = `${folderName}/${name}.svg`;
    try {
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
      }
    } catch (err) {
      console.error(err);
    }



    fs.writeFile(path_, fileuploads, function (err) {
      if (err) console.log(err);
      fs.readFile(path_, function (err, data) {
        if (err) throw err;
        console.log("Upload SVG")
      });
    });

    return name;

  }
  catch (e) {

    console.log("error")
  }
};
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}



var ObjectId = require('mongoose').Types.ObjectId;
shirts.get('/slide', async (req, res) => {

  let shirtsR = await Shirts.aggregate([
    { $match: { permission: true } },
    { $sort: { _id: - 1 } }, { $limit: 6 }
  ])

  res.status(200).json(shuffle(shirtsR))
});


shirts.get('/gallery', async (req, res) => {
  let shirtsR = await Shirts.aggregate([
    { $match: { permission: true } }
  ])

  res.status(200).json(shuffle(shirtsR))
});

shirts.get('/store/:_id?', async (req, res) => {

  let id = ObjectId(req.params._id)
  let shirtsR = await Shirts.aggregate([
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
  ])

  res.status(200).json(shirtsR)
});


shirts.post('/create_shirt/:_id?', async (req, res) => {

  let _id = req.body._id;
  //let color = req.body.color;
  // let _type = req.body.type_shirt;

  const front_path = fileFn(_id, req.body.front, 'front')
  const back_path = fileFn(_id, req.body.back, 'back')
  fileFnSVG(front_path, req.body.SvF)
  fileFnSVG(back_path, req.body.SvB)



  let color = req.body.color;
  let _type = req.body.type_shirt;

  let permission = req.body.permission;

  //let ts = fileFnSVG(_id, req.body.ts, 'front')
  var myobj = {
    nameshirt_: req.body.nameshirt_,
    shirt_path: { "front": front_path, "back": back_path },
    property: { "_type": _type, "color": color },
    detail: `A shirt want to permission: ${permission}`,
    user_id: ObjectId(_id),
    shirtPrice: req.body.price,

  };

  await Shirts.create(myobj).then((shirt) => {

    return res.status(200).json({ "shirt": shirt })
  })

});


shirts.post('/svgShirts/:_id?', async (req, res) => {

  let _id = req.body._id;
  //let color = req.body.color;
  // let _type = req.body.type_shirt;

  let ts = fileFnSVG(_id, req.body.ts, 'front')
  console.log(ts)

});



shirts.get('/SVG/:name?', async (req, res) => {



  res.status(200).json(shuffle(shirtsR))
});

shirts.post('/findshirts', async (req, res, next) => {
  if (ObjectId.isValid(req.body._id)) {
    try {





      const shirt = await Shirts.aggregate([{
        $lookup:
        {
          from: 'users',

          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $match: { _id: ObjectId(req.body._id) } }

      ])
      console.log(shirt)
      res.json(shirt)
      next
    } catch (err) {
      console.log(err)
    }
  } else {
    res.json({})
  }

});

shirts.get('/download/:path_', function (req, res) {
  const file = `public/shirts/SVG/${req.params.path_}.svg`;
  res.download(file); // Set disposition and send it.
});



module.exports = shirts;
