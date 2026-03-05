-- Idempotent breed seed for existing databases
-- Safe to run multiple times: inserts only missing (breedName, species) pairs.

INSERT INTO breed_tbl (breedName, species)
SELECT src.breedName, src.species
FROM (
  SELECT 'Persian' AS breedName, 'Cat' AS species
  UNION ALL SELECT 'Siamese', 'Cat'
  UNION ALL SELECT 'Maine Coon', 'Cat'
  UNION ALL SELECT 'British Shorthair', 'Cat'
  UNION ALL SELECT 'Ragdoll', 'Cat'
  UNION ALL SELECT 'Bengal', 'Cat'
  UNION ALL SELECT 'Sphynx', 'Cat'
  UNION ALL SELECT 'Scottish Fold', 'Cat'
  UNION ALL SELECT 'American Shorthair', 'Cat'
  UNION ALL SELECT 'Abyssinian', 'Cat'
  UNION ALL SELECT 'Domestic Shorthair', 'Cat'
  UNION ALL SELECT 'Domestic Longhair', 'Cat'
  UNION ALL SELECT 'Russian Blue', 'Cat'
  UNION ALL SELECT 'Norwegian Forest Cat', 'Cat'
  UNION ALL SELECT 'Birman', 'Cat'
  UNION ALL SELECT 'Mixed Breed', 'Cat'
  UNION ALL SELECT 'Labrador', 'Dog'
  UNION ALL SELECT 'Labrador Retriever', 'Dog'
  UNION ALL SELECT 'Golden Retriever', 'Dog'
  UNION ALL SELECT 'German Shepherd', 'Dog'
  UNION ALL SELECT 'Shih Tzu', 'Dog'
  UNION ALL SELECT 'Chihuahua', 'Dog'
  UNION ALL SELECT 'Pomeranian', 'Dog'
  UNION ALL SELECT 'Aspin', 'Dog'
  UNION ALL SELECT 'Beagle', 'Dog'
  UNION ALL SELECT 'Poodle', 'Dog'
  UNION ALL SELECT 'French Bulldog', 'Dog'
  UNION ALL SELECT 'Siberian Husky', 'Dog'
  UNION ALL SELECT 'Dachshund', 'Dog'
  UNION ALL SELECT 'Rottweiler', 'Dog'
  UNION ALL SELECT 'Mixed Breed', 'Dog'
  UNION ALL SELECT 'Border Collie', 'Dog'
) AS src
WHERE NOT EXISTS (
  SELECT 1
  FROM breed_tbl b
  WHERE b.breedName = src.breedName
    AND b.species = src.species
);
