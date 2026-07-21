import * as v from "valibot";

export const LoginScheme = v.object({
  email: v.pipe(
    v.string("Vaš email mora biti tekst."),
    v.nonEmpty("Molim vas upišite email."),
    v.minLength(5, "Vaša email mora imati 5 ili više znakova."),
    v.email("Neispravan format e-mail adrese."),
  ),
  password: v.pipe(
    v.string("Vaša lozinka mora biti tekst."),
    v.nonEmpty("Molim vas unesite svoju lozinku."),
    v.minLength(6, "Vaša lozinka mora imati 6 ili više znakova."),
  ),
});
