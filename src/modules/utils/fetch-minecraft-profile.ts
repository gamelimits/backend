import { InvalidMinecraftProfileResponseError } from '../minecraft/errors/invalid-minecraft-profile-response.error.js';
import { minecraftProfileSchema } from '../minecraft/schemas/minecraft-profile.schema.js';

export const fetchMinecraftProfile = async (id: string) => {
  const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${id}`);

  if (response.status !== 200) {
    throw new InvalidMinecraftProfileResponseError();
  }

  const json = (await response.json()) as unknown;

  return minecraftProfileSchema.parse(json);
};
