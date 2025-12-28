'use server';

import {
  updateName as updateNameHelper,
  updateEmail as updateEmailHelper
} from '@/utils/auth-helpers/server';

export async function updateName(formData: FormData): Promise<void> {
  return updateNameHelper(formData);
}

export async function updateEmail(formData: FormData): Promise<void> {
  return updateEmailHelper(formData);
}
