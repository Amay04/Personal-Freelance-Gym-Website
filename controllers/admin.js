import { Plan } from "../models/plans.js";
import { Query } from "../models/queries.js";
import { Schedule } from "../models/schedule.js";

export const addplan = async (req, res) => {
  try {
    const { name, amount, description, description1, description2 } = req.body;

    await Plan.create({
      name: name,
      amount: amount,
      description: description,
      description1: description1,
      description2: description2,
    });

    res.render("addPlans");
  } catch (e) {
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