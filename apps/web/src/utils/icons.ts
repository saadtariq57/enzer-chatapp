import {
  Camera,
  Image,
  File,
  Mic,
  Video,
  Map,
  MessageCircle,
  Lock,
  Sparkles,
  HelpCircle
} from "lucide-react";

/**
 * Returns an icon component based on the provided name
 */
export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Camera":
      return Camera;
    case "Image":
      return Image;
    case "File":
      return File;
    case "Mic":
      return Mic;
    case "Video":
      return Video;
    case "Map":
      return Map;
    default:
      return File;
  }
};

/**
 * Returns a help section icon based on the icon type
 */
export const getHelpIcon = (iconType: string) => {
  switch (iconType) {
    case "MessageCircle":
      return MessageCircle;
    case "Lock":
      return Lock;
    case "Mic":
      return Mic;
    case "Sparkles":
      return Sparkles;
    case "Image":
      return Image;
    default:
      return HelpCircle;
  }
}; 