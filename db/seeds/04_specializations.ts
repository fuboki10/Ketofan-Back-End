import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('specializations').del();

  // Inserts seed entries
  await knex('specializations').insert([
    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Dermatology.png',

      name: 'Dermatology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Dentistry.png',

      name: 'Dentistry',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Psychiatry.png',

      name: 'Psychiatry',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Pediatrics and New Born.png',
      name: 'Pediatrics and New Born',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Neurology.png',

      name: 'Neurology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Orthopedics.png',

      name: 'Orthopedics',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Gynaecology and Infertility.png',
      name: 'Gynaecology and Infertility',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Ear, Nose and Throat.png',
      name: 'Ear, Nose and Throat',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Cardiology and Vascular Disease.png',
      name: 'Cardiology and Vascular Disease',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Allergy and Immunology.png',
      name: 'Allergy and Immunology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Andrology and Male Infertility.png',
      name: 'Andrology and Male Infertility',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Audiology.png',

      name: 'Audiology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Cardiology and Thoracic Surgery.png',
      name: 'Cardiology and Thoracic Surgery',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Chest and Respiratory.png',
      name: 'Chest and Respiratory',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Diabetes and Endocrinology.png',
      name: 'Diabetes and Endocrinology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Diagnostic Radiology.png',
      name: 'Diagnostic Radiology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Dietitian and Nutrition.png',
      name: 'Dietitian and Nutrition',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Family Medicine.png',
      name: 'Family Medicine',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Gastroenterology and Endoscopy.png',
      name: 'Gastroenterology and Endoscopy',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/General Practice.png',
      name: 'General Practice',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/General Surgery.png',
      name: 'General Surgery',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Elders.png',

      name: 'Geriatrics',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Hematology.png',

      name: 'Hematology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Hepatology.png',

      name: 'Hepatology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Internal Medicine.png',
      name: 'Internal Medicine',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/IVF and Infertility.png',
      name: 'IVF and Infertility',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Laboratories.png',

      name: 'Laboratories',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Nephrology.png',

      name: 'Nephrology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Neurosurgery.png',

      name: 'Neurosurgery',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Obesity and Laparoscopic Surgery.png',
      name: 'Obesity and Laparoscopic Surgery',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Oncology.png',

      name: 'Oncology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Oncology Surgery.png',
      name: 'Oncology Surgery',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Ophthalmology.png',
      name: 'Ophthalmology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Osteopathy.png',

      name: 'Osteopathy',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Pain Management.png',
      name: 'Pain Management',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Pediatric Surgery.png',
      name: 'Pediatric Surgery',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Phoniatrics.png',

      name: 'Phoniatrics',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Physiotherapy and Sport Injuries.png',
      name: 'Physiotherapy and Sport Injuries',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Plastic Surgery.png',
      name: 'Plastic Surgery',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Rheumatology.png',

      name: 'Rheumatology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Spinal Surgery.png',
      name: 'Spinal Surgery',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Urology.png',

      name: 'Urology',
    },

    {
      src: 'https://cdn-dr-images.vezeeta.com/Specialties/Vascular Surgery.png',
      name: 'Vascular Surgery',
    },
  ]);
}
