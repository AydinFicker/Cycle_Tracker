import { LoggingCategory } from "@/types/logging";
import { Colors } from "./Colors";

export const LOGGING_CATEGORIES: LoggingCategory[] = [
  {
    id: "ovulation_test",
    title: "Ovulation test",
    description: "Log them to know when you ovulate",
    backgroundColor: "#E0F4F4", // Light teal
    hasTutorial: true,
    options: [
      {
        id: "log_test",
        label: "Log ovulation test",
        icon: "add-circle-outline",
        backgroundColor: "#E0F4F4",
        hasAddButton: true,
      },
      {
        id: "no_test",
        label: "Didn't take tests",
        icon: "close-circle-outline",
        backgroundColor: "#E0F4F4",
      },
      {
        id: "my_method",
        label: "Ovulation: My method",
        icon: "options-outline",
        backgroundColor: "#E0F4F4",
      },
    ],
  },
  {
    id: "sex_and_drive",
    title: "Sex and sex drive",
    backgroundColor: "#FFE4E4", // Light pink
    isGrid: true,
    options: [
      {
        id: "no_sex",
        label: "Didn't have sex",
        icon: "close-circle",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "protected_sex",
        label: "Protected sex",
        icon: "lock-closed",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "unprotected_sex",
        label: "Unprotected sex",
        icon: "lock-open",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "oral_sex",
        label: "Oral sex",
        icon: "water",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "anal_sex",
        label: "Anal sex",
        icon: "ellipse",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "masturbation",
        label: "Masturbation",
        icon: "heart",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "sensual_touch",
        label: "Sensual touch",
        icon: "hand-left",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "sex_toys",
        label: "Sex toys",
        icon: "star",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "orgasm",
        label: "Orgasm",
        icon: "sparkles",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "high_sex_drive",
        label: "High sex drive",
        icon: "heart",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "neutral_sex_drive",
        label: "Neutral sex drive",
        icon: "remove",
        backgroundColor: "#FFE4E4",
      },
      {
        id: "low_sex_drive",
        label: "Low sex drive",
        icon: "arrow-down",
        backgroundColor: "#FFE4E4",
      },
    ],
  },
  {
    id: "mood",
    title: "Mood",
    backgroundColor: "#FFE4D6", // Light orange
    isGrid: true,
    options: [
      {
        id: "calm",
        label: "Calm",
        icon: "happy",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "happy",
        label: "Happy",
        icon: "happy",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "energetic",
        label: "Energetic",
        icon: "flash",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "frisky",
        label: "Frisky",
        icon: "happy",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "mood_swings",
        label: "Mood swings",
        icon: "sync",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "irritated",
        label: "Irritated",
        icon: "sad",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "sad",
        label: "Sad",
        icon: "sad",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "anxious",
        label: "Anxious",
        icon: "warning",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "depressed",
        label: "Depressed",
        icon: "sad",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "guilty",
        label: "Feeling guilty",
        icon: "sad",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "obsessive",
        label: "Obsessive thoughts",
        icon: "repeat",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "low_energy",
        label: "Low energy",
        icon: "battery-dead",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "apathetic",
        label: "Apathetic",
        icon: "remove",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "confused",
        label: "Confused",
        icon: "help",
        backgroundColor: "#FFE4D6",
      },
      {
        id: "self_critical",
        label: "Very self-critical",
        icon: "warning",
        backgroundColor: "#FFE4D6",
      },
    ],
  },
  {
    id: "symptoms",
    title: "Symptoms",
    backgroundColor: "#F8E1F4", // Light purple
    isGrid: true,
    options: [
      {
        id: "all_fine",
        label: "Everything is fine",
        icon: "thumbs-up",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "cramps",
        label: "Cramps",
        icon: "fitness",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "tender_breasts",
        label: "Tender breasts",
        icon: "warning",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "headache",
        label: "Headache",
        icon: "head",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "acne",
        label: "Acne",
        icon: "radio-button-on",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "backache",
        label: "Backache",
        icon: "body",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "fatigue",
        label: "Fatigue",
        icon: "battery-dead",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "cravings",
        label: "Cravings",
        icon: "restaurant",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "insomnia",
        label: "Insomnia",
        icon: "moon",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "abdominal_pain",
        label: "Abdominal pain",
        icon: "fitness",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "vaginal_itching",
        label: "Vaginal itching",
        icon: "alert",
        backgroundColor: "#F8E1F4",
      },
      {
        id: "vaginal_dryness",
        label: "Vaginal dryness",
        icon: "water",
        backgroundColor: "#F8E1F4",
      },
    ],
  },
  {
    id: "discharge",
    title: "Vaginal discharge",
    backgroundColor: "#E6E6FA", // Lavender
    isGrid: true,
    options: [
      {
        id: "no_discharge",
        label: "No discharge",
        icon: "close-circle",
        backgroundColor: "#E6E6FA",
      },
      {
        id: "creamy",
        label: "Creamy",
        icon: "water",
        backgroundColor: "#E6E6FA",
      },
      {
        id: "watery",
        label: "Watery",
        icon: "water",
        backgroundColor: "#E6E6FA",
      },
      {
        id: "sticky",
        label: "Sticky",
        icon: "water",
        backgroundColor: "#E6E6FA",
      },
      {
        id: "egg_white",
        label: "Egg white",
        icon: "water",
        backgroundColor: "#E6E6FA",
      },
      {
        id: "spotting",
        label: "Spotting",
        icon: "ellipse",
        backgroundColor: "#E6E6FA",
      },
      {
        id: "unusual",
        label: "Unusual",
        icon: "warning",
        backgroundColor: "#E6E6FA",
      },
      {
        id: "clumpy_white",
        label: "Clumpy white",
        icon: "snow",
        backgroundColor: "#E6E6FA",
      },
      {
        id: "gray",
        label: "Gray",
        icon: "water",
        backgroundColor: "#E6E6FA",
      },
    ],
  },
  {
    id: "physical",
    title: "Physical activity",
    backgroundColor: "#E0F4E0", // Light green
    isGrid: true,
    options: [
      {
        id: "no_exercise",
        label: "Didn't exercise",
        icon: "close-circle",
        backgroundColor: "#E0F4E0",
      },
      {
        id: "yoga",
        label: "Yoga",
        icon: "body",
        backgroundColor: "#E0F4E0",
      },
      {
        id: "gym",
        label: "Gym",
        icon: "barbell",
        backgroundColor: "#E0F4E0",
      },
      {
        id: "aerobics",
        label: "Aerobics & dancing",
        icon: "musical-notes",
        backgroundColor: "#E0F4E0",
      },
      {
        id: "swimming",
        label: "Swimming",
        icon: "water",
        backgroundColor: "#E0F4E0",
      },
      {
        id: "team_sports",
        label: "Team sports",
        icon: "basketball",
        backgroundColor: "#E0F4E0",
      },
      {
        id: "running",
        label: "Running",
        icon: "walk",
        backgroundColor: "#E0F4E0",
      },
      {
        id: "cycling",
        label: "Cycling",
        icon: "bicycle",
        backgroundColor: "#E0F4E0",
      },
      {
        id: "walking",
        label: "Walking",
        icon: "walk",
        backgroundColor: "#E0F4E0",
      },
    ],
  },
  {
    id: "other_pills",
    title: "Other pills (non-OC)",
    description: "Log other pills you take a day",
    backgroundColor: "#E0F0FF", // Light blue
    options: [
      {
        id: "add_pill",
        label: "Add pill",
        icon: "add-circle",
        backgroundColor: "#E0F0FF",
        hasAddButton: true,
      },
    ],
  },
];
