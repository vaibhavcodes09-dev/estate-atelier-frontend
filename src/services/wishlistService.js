// wishlistService.js — placeholder service for user wishlist management.
// All functions are empty stubs with TODO comments.
// Will be wired to Supabase data layer in a future implementation.

export async function getWishlist(userId) {
  // TODO: fetch wishlist items for the given user from Supabase
  console.log('getWishlist', userId);
  return [];
}

export async function addToWishlist(userId, propertyId) {
  // TODO: insert a wishlist entry into Supabase
  console.log('addToWishlist', userId, propertyId);
}

export async function removeFromWishlist(userId, propertyId) {
  // TODO: delete a wishlist entry from Supabase
  console.log('removeFromWishlist', userId, propertyId);
}

export async function isWishlisted(userId, propertyId) {
  // TODO: check if a property is in the user's wishlist
  console.log('isWishlisted', userId, propertyId);
  return false;
}
