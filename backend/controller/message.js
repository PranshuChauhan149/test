import Message from "../model/mes.js";

export const messages = async (req, res) => {
  try {
    const { message } = req.body;
    await Message.create({
      message,
    });
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(400).json({ message: "not done" });
  }
};

export const Allmessage = async (req, res) => {
  try {
    const ress = await Message.find({});

    res.status(200).json({ ress });
  } catch (error) {
    res.status(400).json({ message: "not show" });
  }
};
