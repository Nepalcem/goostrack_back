const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const phoneRegexp =
  /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;

const birthdayRegexp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

const passwordRegexp =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const timeRegexp = /^([0-9]{2})\:([0-9]{2})$/;

const dateRegexp = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

module.exports = {
  emailRegexp,
  phoneRegexp,
  passwordRegexp,
  timeRegexp,
  dateRegexp,
  birthdayRegexp,
};
