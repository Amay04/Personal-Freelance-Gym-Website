import { Diet } from "../models/diet.js";
import { Plan } from "../models/plans.js";
import { Query } from "../models/queries.js";
import { Schedule } from "../models/schedule.js";
import { User } from "../models/user.js";


// Manage User

export const deleteUser = async (req, res) =>{
await User.deleteOne({_id: req.params.id});
res.redirect("/manageUser");
}


//Manage Plan
export const addplan = async (req, res) => {
  try {
    const { name, amount, description, description1, description2, duration } = req.body;

    await Plan.create({
      name,
      amount,
      image:`/uploads/${req.file.filename}`,
       description,
       description1,
       description2,
      duration
    });
    res.render("addPlans");
  } catch (e) {
    console.log(e);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const showplan = async (req, res) => {
  let plan = await Plan.find();
  res.render("showplans", { plan });
};

// delete plan

export const deletePlan = async (req, res) => {
  try {

    await Schedule.deleteMany({plan: req.params.id});
    await Plan.deleteOne({_id: req.params.id});
    res.redirect("/showplans")

  } catch (e) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// Add schedule

export const addSchedule = async (req, res) => {
  try {
    const plan = await Plan.find();
    res.render("addSchedule", { plan });
  } catch (e) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const { title, time, plan, link } = req.body;

    const Plans = await Plan.findOne({ name: plan });

    await Schedule.create({
      title,
      time,
      plan: Plans._id,
      link,
    });

    res.redirect("/addschedule");
  } catch (e) {
    console.log(e);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const displaySchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find().populate("plan");

    res.render("manageSchedule", { schedule });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete schedule

export const deleteSchedule = async (req, res) => {
  try {
    await Schedule.deleteOne({ _id: req.params.id });
    res.redirect("/manageSchedule");
  } catch (e) {
    console.log(e);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
// query
export const getquery = async(req,res) =>{
  try{
  const query = await Query.find()
  res.render("query", {query})

  }catch(e){
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export const deleteQuery = async (req,res) =>{
  try{
  await Query.deleteOne({_id:req.params.id});
  res.redirect("/getquery")
  
  }
  catch(e){
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export const viewDiet = async(req,res) =>{
  try{
res.render("addDiet");
  }catch(e){
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export const sendDiet = async(req,res) =>{
  try{
    const { meal1, meal2, meal3, meal4 } = req.body;

    await Diet.create({
      meal1,
      meal2,
      meal3,
      meal4,
    });

    res.redirect("/addDiet");

  }catch(e){
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
}