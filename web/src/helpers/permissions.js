import { defineAbility } from '@casl/ability';

export const ROLE_PERMISSIONS_USER = {
  ACTIONS: {
    ADD: 'add',
    EDIT: 'edit',
    SEE: 'see'
  },
  RESOURCES: {
    APPOINTMENT: 'appointment',
    SERVICE: 'service',
    // nav
    NAV_APPOINTMENTS: 'nav appointments',
    NAV_SERVICES: 'nav services'
  }
};

const { ACTIONS, RESOURCES } = ROLE_PERMISSIONS_USER;

const ADMIN = defineAbility((can) => {
  // can(ACTIONS.ADD, RESOURCES.INTERNAL_USER);
  // can(ACTIONS.EDIT, RESOURCES.INTERNAL_USER);
  // can(ACTIONS.ADD, RESOURCES.CLIENT_USER);
  // can(ACTIONS.EDIT, RESOURCES.CLIENT_USER);
  // can(ACTIONS.ADD, RESOURCES.CLIENT);
  // can(ACTIONS.EDIT, RESOURCES.CLIENT);
  // // nav menu
  // can(ACTIONS.SEE, RESOURCES.NAV_ADVERTISEMENTS);
  // can(ACTIONS.SEE, RESOURCES.NAV_USERS);
  // can(ACTIONS.SEE, RESOURCES.NAV_SETTINGS);
});

const NORMAL = defineAbility((can) => {
  can(ACTIONS.ADD, RESOURCES.APPOINTMENT);
  can(ACTIONS.EDIT, RESOURCES.APPOINTMENT);
  can(ACTIONS.ADD, RESOURCES.SERVICE);
  can(ACTIONS.EDIT, RESOURCES.SERVICE);

  //nav
  can(ACTIONS.SEE, RESOURCES.NAV_APPOINTMENTS);
  can(ACTIONS.SEE, RESOURCES.NAV_SERVICES);
});

const COMPANY = defineAbility((can) => {
  can(ACTIONS.SEE, RESOURCES.NAV_ADVERTISEMENTS);
  can(ACTIONS.SEE, RESOURCES.NAV_SETTINGS);
});

const SIGNED_OUT = defineAbility(() => {});

const roles = [SIGNED_OUT, ADMIN, NORMAL, COMPANY];

export const getAbility = (userRole) => {
  // console.log(roles[userRole]);
  // return roles[userRole];
};
