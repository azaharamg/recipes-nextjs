export default function validateNewRecipe(values) {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.author) {
    errors.author = 'Author is required';
  }

  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length > 700) {
    errors.description = 'Description is too long';
  }

  return errors;
}
