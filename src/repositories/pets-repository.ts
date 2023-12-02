import {
  Pet,
  PetAge,
  PetEnergy,
  PetEnvironment,
  PetIndependency,
  PetSize,
  Prisma,
} from '@prisma/client'

export interface FindManyPetsParams {
  city: string
  age?: PetAge
  energy?: PetEnergy
  independency?: PetIndependency
  size?: PetSize
  environment?: PetEnvironment
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findMany(data: FindManyPetsParams): Promise<Pet[]>
}
