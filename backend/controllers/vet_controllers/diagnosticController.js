import db from "../../config/db.js";

// Get symptoms for a specific species
export const getSymptomsBySpecies = async (req, res) => {
    try{
        const { species } = req.params;
        if (!species) {
            return res.status(400).json({ error: "Species parameter is required" });
        }

        // Fetch all categories with symptoms for this species
        const [rows] = await db.execute(
        `SELECT 
            c.systemID AS category_id,
            c.systemName AS category_label,
            s.symptomID AS symptom_id,
            s.symptomName AS symptom_name,
            s.featureName AS feature_name
        FROM symptom_system_tbl c
        INNER JOIN symptoms_tbl s 
            ON s.systemID = c.systemID AND LOWER(s.species) = LOWER(?)
        ORDER BY c.systemID, s.symptomID`,
        [species]
        );

        // Group symptoms by category
        const categoryMap = {};

        rows.forEach(row => {
        if (!categoryMap[row.category_id]) {
            categoryMap[row.category_id] = {
            label: row.category_label,
            symptoms: []
            };
        }

        if (row.symptom_id) {
            categoryMap[row.category_id].symptoms.push({
            symptom_name: row.symptom_name,
            feature_name: row.feature_name
            });
        }
        });

        // Convert to array
        const result = Object.values(categoryMap);

        res.json(result);

    }catch (err) {
        console.error("Error fetching symptoms:", err);
        res.status(500).json({ error: "Failed to fetch symptoms" });
    }
};
    

