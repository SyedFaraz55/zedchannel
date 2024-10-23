const express = require("express");
const BroadCast = require("./Schema/BroadCast");
const app = express();
const mongoose = require("mongoose");
const Videos = require("./Schema/Content");
const bodyParser = require("body-parser");
const multer = require("multer");
const { uploadFile } = require("./s3");
const cors = require("cors")
const morgan = require("morgan");
const Enquiry = require("./Schema/Enquiry");
const promo = require("./Schema/Promotions");
const Team = require("./Schema/Team");
const Animal = require("./Schema/Animal");
const Person = require("./Schema/Person");
const upload = multer({ dest: "uploads/" });
const helmet = require("helmet");
const { logger } = require("./logger");

app.use(helmet({
  contentSecurityPolicy: {
    directves:{
      'script-src':['self']
    }
  }
}))
app.use(bodyParser({ extended: true }));
app.use(cors())
mongoose
  .connect(
    "mongodb+srv://syed55df:developer@cluster0.vqo8p.mongodb.net/zednews?retryWrites=true&w=majority"
  )
  .then((_) => logger.info("Connected to DB"))
  .catch((err) => logger.error("failed to connect to db"));
app.use(morgan("tiny"));

const PORT = process.env.PORT || 9000

app.get("/", async (req, res) => {
  return res.status(200).json({ ok: true, message: "Server health is good" });
});
app.post("/broadcast", async (req, res) => {

  const check = await BroadCast.find({});

  if(check){
    const upd = await BroadCast.updateOne({_id:check[0]._id},{
      $set:{
        link:req.body.link
      }
    })

    if(upd.modifiedCount > 0) {
      return res.status(200).json({ok:true,message:"Link updated"});
    } else {
      return res.status(200).json({ok:false,message:"failed to updated link"});
    }
  }

  try {
    const result = new BroadCast(req.body);
    result.save();

    return res.status(200).json({ ok: true, message: "Link Added" });
  } catch (err) {
    return res
      .status(200)
      .json({ ok: false, message: "Failed to add link", err });
  }
});

app.get("/live", async (req, res) => {
  const results = await BroadCast.find({});
  return res.status(200).json({ ok: true, data: results });
});

app.post("/s3url", upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    const s = await uploadFile(req.file);
    return res.send({ url: s.Location });
  } catch (err) {
    return res.send(err);
  }
});

app.post("/upload", async (req, res) => {
  console.log(req.body);
  try {
    const record = new Videos(req.body);
    record.save();

    return res.status(200).json({
      ok: true,
      message: "Video added",
    });
  } catch (err) {
    return res.status(200).json({
      ok: false,
      message: "fail to add content",
    });
  }
});

app.get("/all", async (req, res) => {
  const docs = await Videos.find({});
  return res.json({ ok: true, data: docs });
});

app.post("/enquiry", async (req, res) => {
  try {
    const enq = new Enquiry(req.body);
    enq.save();
    return res.json({
      ok: true,
      message: "Thank you for contacting us. We will contact you shortly",
    });
  } catch (err) {
    return res.json({ ok: false });
  }
});

app.get("/get-enquiry",async(req,res)=> {
  const r = await Enquiry.find({});
  return res.json({ok:true,data:r})
})

app.post("/add-promo", async (req, res) => {
  try {
    const prom = new promo(req.body);
    prom.save();
    return res.json({ ok: true, message: "Promo Added" });
  } catch (err) {
    return res.json({ ok: false });
  }
});

app.get("/get-promo", async (req, res) => {
  try {
    const prom = await promo.find({});
    return res.json({ ok: true, data:prom });
  } catch (err) {
    return res.json({ ok: false });
  }
});

app.delete("/delete-promo/:id", async (req, res) => {
  try {
    const prom = await promo.deleteOne({_id:req.params.id});
    return res.json({ok:true})
  } catch (err) {
    return res.json({ ok: false });
  }
});

app.delete("/delete-video/:id", async (req, res) => {
  try {
    const prom = await Videos.deleteOne({_id:req.params.id});
    return res.json({ok:true})
  } catch (err) {
    return res.json({ ok: false });
  }
});


app.post("/team", async (req, res) => {
  console.log(req.body);
  try {
    const record = new Team(req.body);
    record.save();

    return res.status(200).json({
      ok: true,
      message: "Team added",
    });
  } catch (err) {
    return res.status(200).json({
      ok: false,
      message: "fail to add team",
    });
  }
});


app.get("/get-teams",async(req,res) => {
  const results = await Team.find({});
  res.status(200).json({ok:true,data:results})
})

app.delete("/delete-team/:id",async(req,res) => {
  const results = await Team.deleteOne({_id:req.params.id});
  if(results.deletedCount > 0) {

  res.status(200).json({ok:true,data:results})
  }else {

  res.status(200).json({ok:false,data:results})
  }
})




app.listen(PORT, () => console.log(`@server listening at ${PORT}`));
