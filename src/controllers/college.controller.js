import { supabase } from "../supabase.js";

// Add a new college
export const addCollege = async (req, res) => {
  try {
    const { name, type, established, location, courses, facilities, tags } = req.body;

    if (!name || !type || !established || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("colleges")
      .insert([
        {
          name,
          type,
          established,
          location,
          courses,
          facilities,
          tags
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    res.json({ message: "College added", college: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all colleges
export const getColleges = async (req, res) => {
  try {
    const { data, error } = await supabase.from("colleges").select("*");
    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one college by ID
export const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("colleges")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);      
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
