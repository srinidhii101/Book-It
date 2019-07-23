import ls, { get } from "local-storage";

export function checkRole(allowedRoles) {
  let redirectFlag = true;
  allowedRoles.map(role => {
    const bookit = ls.get('bookit');
    if(bookit) {
      if(bookit.role === role) {
        redirectFlag = false;
      }
    }
  });

  return redirectFlag;
}

export function checkUserId() {
  const bookit = ls.get('bookit');
  return bookit.id;
}

export function isLoggedIn() {
  const bookit = ls.get('bookit');
  return !!bookit;
}

export function logout() {
  ls.remove('bookit');
}
