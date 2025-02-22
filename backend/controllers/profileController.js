const Profile = require("../models/Profile");

// Create Profile
exports.createProfile = async (req, res) => {
  try {
    const { email, name, phone, youtube_link, insta_link } = req.body;

    let profile = await Profile.findOne({ email });
    if (profile) return res.status(400).json({ message: "Profile already exists" });

    profile = new Profile({ email, name, phone, youtube_link, insta_link });
    await profile.save();

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Profile
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    console.log(profiles)
    if (profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, youtube_link, insta_link } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { email: req.params.email },
      { $set: { name, phone, youtube_link, insta_link } },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
    console.log(req.body)
    res.json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ email: req.params.email });

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
