const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },
  name: { type: String, required: true, trim: true },
  phone: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, "Phone number must be 10 digits"] 
  },
  youtube_link: { 
    type: String, 
    validate: {
      validator: function (v) {
        return !v || /^https:\/\/(www\.)?youtube\.com\/.*$/.test(v);
      },
      message: "Invalid YouTube URL"
    }
  },
  insta_link: { 
    type: String, 
    validate: {
      validator: function (v) {
        return !v || /^https:\/\/(www\.)?instagram\.com\/.*$/.test(v);
      },
      message: "Invalid Instagram URL"
    }
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
