// Type definitions for Sequelize models
export interface IdeaAttributes {
  id: number;
  title: string;
  description: string;
  votesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoteAttributes {
  id: number;
  ideaId: number;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IdeaInstance {
  id: number;
  title: string;
  description: string;
  votesCount: number;
  createdAt: Date;
  updatedAt: Date;
  increment(field: string, options: any): Promise<void>;
  reload(): Promise<void>;
}

export interface VoteInstance {
  id: number;
  ideaId: number;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SequelizeInstance {
  transaction(): any;
}

export interface Models {
  Idea: {
    findAll(options?: any): Promise<IdeaInstance[]>;
    findByPk(id: number): Promise<IdeaInstance | null>;
  };
  Vote: {
    findAll(options?: any): Promise<VoteInstance[]>;
    findOne(options?: any): Promise<VoteInstance | null>;
    count(options?: any): Promise<number>;
    create(data: any, options?: any): Promise<VoteInstance>;
  };
  sequelize: SequelizeInstance;
}
