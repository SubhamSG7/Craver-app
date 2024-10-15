const express = require("express");
const Staff=require("../models/staff");
async function updatestaff(req,res){
    const staffUpdates=req.body;
    try {
        const updatedStaffMembers = [];

        for (const update of staffUpdates) {
            const { _id, restaurant,approved } = update;
            const staffMember = await Staff.findById(_id);
            
            if (!staffMember) {
                return res.status(404).json({ message: `Staff member with ID ${_id} not found` });
            }
            staffMember.restaurant = restaurant;
            staffMember.approved = approved; 
            const updatedStaffMember = await staffMember.save();
            updatedStaffMembers.push(updatedStaffMember);
        }

        return res.status(200).json({ message: "Staff members updated successfully", updatedStaffMembers });
    } catch (error) {
        console.error("Error updating staff:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
}
module.exports=updatestaff;