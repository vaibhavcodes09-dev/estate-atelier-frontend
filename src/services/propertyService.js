// propertyService.js — placeholder service for property CRUD.
// All functions are empty stubs with TODO comments.
// Will be wired to Supabase data layer in a future implementation.

export async function getProperties(filters) {
  // TODO: fetch properties from Supabase with optional filters
  console.log('getProperties', filters);
  return [];
}

export async function getPropertyById(id) {
  // TODO: fetch a single property by ID from Supabase
  console.log('getPropertyById', id);
  return null;
}

export async function createProperty(data) {
  // TODO: insert a new property listing into Supabase
  console.log('createProperty', data);
}

export async function updateProperty(id, data) {
  // TODO: update an existing property in Supabase
  console.log('updateProperty', id, data);
}

export async function deleteProperty(id) {
  // TODO: delete a property from Supabase
  console.log('deleteProperty', id);
}
