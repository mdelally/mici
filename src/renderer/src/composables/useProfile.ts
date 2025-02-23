import { ref, Ref } from 'vue'
import type { Profile } from '../types/profile'

export default function useProfile() {
  const activeProfile: Ref<Profile | null> = ref(null)

  function setActiveProfile(profile: Profile): void {
    activeProfile.value = profile
  }

  function loadProfile(): void {
    // grab from local storage and setActiveProfile
  }

  function saveProfile(): void {
    // store or update key in local storage
  }

  return {
    activeProfile
  }
}
