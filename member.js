function skillsMember() {
  const member = document.querySelector('.member');
  const skills = document.querySelector('.skills');

  if (member && skills) {
    const memberHeight = member.offsetHeight;
    const skillsHeight = skills.offsetHeight;

    if (memberHeight > skillsHeight) {
      skills.style.height = `${memberHeight}px`;
    }
  }
}