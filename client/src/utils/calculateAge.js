export const calculateAgeAtMilestone = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const diff = today.getTime() - birth.getTime();
    const ageInMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.436875));
    return ageInMonths;
  };