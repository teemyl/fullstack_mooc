import { v4 as uuid } from 'uuid';

export const generateUUID = (existingIds: Array<string>) : string => {
  let id: string = uuid();
  while(existingIds.includes(id)) id = uuid();
  return id;
}