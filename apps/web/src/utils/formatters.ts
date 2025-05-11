/**
 * Format time to hours:minutes with leading zeros
 */
export const formatTime = (date: Date) => {
  if (!date) return '•••';
  
  // Use 24-hour format with leading zeros for consistency
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Format dates for chat list items
 * Returns time for today, "Yesterday" for yesterday,
 * and date for older messages
 */
export const formatDate = (date: Date) => {
  if (!date) return '•••';
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Using static strings instead of dynamic time calculations where possible
  if (date >= today) {
    return `${hours}:${minutes}`;
  } else if (date >= yesterday) {
    return "Yesterday";
  } else {
    // Use a format that doesn't change with locale
    return `${date.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]}`;
  }
};

/**
 * Format file size in bytes to human-readable format
 */
export const formatFileSize = (bytes: number | undefined) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 