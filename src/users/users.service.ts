import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

export type GoogleProfile = {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ googleId });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(googleProfile: GoogleProfile): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(googleProfile));
  }

  async updateGoogleProfile(user: User, googleProfile: GoogleProfile): Promise<User> {
    Object.assign(user, googleProfile);
    return this.usersRepository.save(user);
  }

  async linkGoogleAccount(user: User, googleProfile: GoogleProfile): Promise<User> {
    Object.assign(user, googleProfile);
    return this.usersRepository.save(user);
  }
}
