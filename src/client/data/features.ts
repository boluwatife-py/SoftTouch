import { IconType } from 'react-icons';
import { 
  FaGlobe, FaServer, FaBook, FaUserFriends, 
  FaCode, FaRocket, FaShieldAlt, FaTools
} from 'react-icons/fa';

interface FeatureType {
  icon: IconType;
  title: string;
  description: string;
}

export const features: FeatureType[] = [
  {
    icon: FaGlobe,
    title: "Free Forever",
    description: "Access all our APIs at no cost, with no rate limits or hidden fees, empowering developers of all backgrounds to build freely."
  },
  {
    icon: FaServer,
    title: "Rock-Solid Reliability",
    description: "Enjoy 99.9% uptime and global scalability, ensuring your applications perform consistently, no matter the demand."
  },
  {
    icon: FaBook,
    title: "Transparent Documentation",
    description: "Clear, comprehensive guides and open roadmaps help you understand our APIs and plan your projects with confidence."
  },
  {
    icon: FaUserFriends,
    title: "Thriving Community",
    description: "Connect with thousands of developers, share knowledge, and grow through our forums, tutorials, and events."
  },
  {
    icon: FaCode,
    title: "Developer-First Design",
    description: "Intuitive APIs and SDKs with consistent patterns make integration quick and easy for developers at any level."
  },
  {
    icon: FaRocket,
    title: "Fast-Track Development",
    description: "Pre-built tools, templates, and integrations let you build and deploy applications faster, saving you time and effort."
  }
];