import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { ENVS } from '../envs/get-envs'

const firebaseConfig = {
  apiKey: ENVS.API_KEY,
  authDomain: ENVS.AUTH_DOMAIN,
  projectId: ENVS.PROJECT_ID,
  storageBucket: ENVS.STORAGE_BUCKET,
  messagingSenderId: ENVS.MESSAGING_SENDER_ID,
  appId: ENVS.APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)
