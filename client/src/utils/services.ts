import { Service } from "../types/Service";
import imageL from '../assets/images/illustration.png';

// Define services with image type as File
const services: Service[] = [
  {
    _id: "1",
    nom: "Vidange d'huile",
    prix: 50,
    description: "Changement d'huile et de filtre à huile.",
    // Assuming imageL is a file imported from assets
    image: imageL as unknown as File,
  },
  {
    _id: "2",
    nom: "Changement de pneus",
    prix: 100,
    description: "Changement de pneus avec équilibrage.",
    image: imageL as unknown as File,
  },
  {
    _id: "3",
    nom: "Diagnostic moteur",
    prix: 80,
    description: "Analyse du système de moteur pour détecter les problèmes.",
    image: imageL as unknown as File,
  },
];

export default services;
