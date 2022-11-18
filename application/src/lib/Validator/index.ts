enum Formats {
  email = 'email',
  password = 'password',
}

enum Types {
  string = 'string',
  number = 'number',
}

interface ValidatorProp {
  entities: Entity[];
}

class Validator {
  private _entities: Entity[] = [];

  constructor({ entities }: ValidatorProp) {
    this._entities = entities;
  }
}

interface Entity {
  title: string;
  properties: EntityProperties;
}

interface EntityProperties {
  [prop: string]: {
    type: Types | Entity;
    minimum?: number;
    maximum?: number;
    format?: Formats;
  };
}

const user = {
  title: 'user',
  properties: {
    email: {
      type: 'string',
    },
  },
};

const last = new Validator({ entities: [user] });
