import uploadOnCloudinary from "../config/cloudinary.js";
import Member from "../model/member.models.js";
import User from "../model/user.model.js";



export const addNew = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      plan,
      startDate,
      endDate,
      paidAmount,
      paymentMode,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and Phone are required." });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    // Step 1: Create the new member
    const newMember = await Member.create({
      name,
      phone,
      address,
      image: imageUrl,
      membership: {
        plan,
        startDate,
        endDate,
        paidAmount,
        paymentMode,
        isActive: true,
      },
    });

    // ✅ Step 2: Update the current user's 'members' array
    if (req.userid) {
      await User.findByIdAndUpdate(
        req.userid,
        { $push: { members: newMember._id } },
        { new: true }
      );
    } else {
      console.log("User not authenticated, cannot update member reference.");
    }

    // Step 3: Send response
    res.status(201).json({
      success: true,
      message: "Member added successfully!",
      Member: newMember,
    });

  } catch (error) {
    console.error("Add Member Error:", error);
    res.status(500).json({ success: false, message: "Failed to add Member." });
  }
};



export const renew = async (req, res) => {
  const { plan, paidAmount, startDate, endDate } = req.body;
  const { id } = req.params;

  try {
    const Member = await Member.findById(id);
    if (!Member) return res.status(404).json({ success: false, message: "Member not found" });

    Member.Membership.plan = plan;
    Member.Membership.paidAmount = paidAmount;
    Member.Membership.startDate = startDate;
    Member.Membership.endDate = endDate;

    await Member.save();

    res.status(200).json({ success: true, message: "Membership renewed successfully", Member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    return res.status(200).json({ success: true, message: "Member deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const editMember = async (req, res) => {
  const { editid } = req.params;
  const { name, phone, address, plan, startDate, endDate, paidAmount, paymentMode } = req.body;

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      editid,
      {
        name,
        phone,
        address,
        Membership: {
          plan,
          startDate,
          endDate,
          paidAmount,
          paymentMode,
        },
      },
      { new: true }  // ✅ returns the updated document
    );

    if (!updatedMember) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      updatedMember,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
