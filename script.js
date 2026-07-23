const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}


// University directory filtering
const directorySearch = document.getElementById('directorySearch');
const filterButtons = document.querySelectorAll('.filter-button');
const directoryItems = document.querySelectorAll('.directory-item');
const noDirectoryResults = document.getElementById('noDirectoryResults');
let activeDirectoryFilter = 'all';

function updateDirectory() {
  if (!directoryItems.length) return;
  const query = (directorySearch?.value || '').trim().toLowerCase();
  let visible = 0;

  directoryItems.forEach((item) => {
    const categoryMatches =
      activeDirectoryFilter === 'all' ||
      item.dataset.category === activeDirectoryFilter;

    const searchableText =
      `${item.dataset.search || ''} ${item.textContent || ''}`.toLowerCase();

    const searchMatches = !query || searchableText.includes(query);
    const show = categoryMatches && searchMatches;

    item.classList.toggle('is-hidden', !show);
    if (show) visible += 1;
  });

  if (noDirectoryResults) noDirectoryResults.hidden = visible !== 0;
}

directorySearch?.addEventListener('input', updateDirectory);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeDirectoryFilter = button.dataset.filter || 'all';
    updateDirectory();
  });
});

// University comparison tool
const institutionData = [
  {name:'NMIMS Online', type:'Online degree university', audience:'Graduates and working professionals', formats:'Online degrees and management programs', compare:'Recognition, specialisation, examination format, total fees and learner support'},
  {name:'Manipal University Jaipur', type:'Online degree university', audience:'Students, graduates and working professionals', formats:'Online UG and PG degrees', compare:'Program portfolio, live learning, fees, examinations and student support'},
  {name:'Amity University Online', type:'Online degree university', audience:'Students and working professionals', formats:'Online UG and PG degrees across disciplines', compare:'Program options, curriculum, learning platform, total fees and support'},
  {name:'Jain University Online', type:'Online degree university', audience:'Graduates and working professionals', formats:'Online degree programs with multiple specialisations', compare:'Specialisation choice, curriculum, fees, assessment and support'},
  {name:'DY Patil Online', type:'Online degree university', audience:'Students and working professionals', formats:'Online management and related degrees', compare:'Program structure, specialisations, fees, examinations and support'},
  {name:'SSODL', type:'Online and digital learning institution', audience:'Students, graduates and working professionals', formats:'Online and digital learning programs', compare:'Credential, delivery format, program availability, fees and assessment'},
  {name:'Amrita Online', type:'Online degree university', audience:'Students and working professionals', formats:'Selected online UG and PG programs', compare:'Program availability, curriculum, fees, examinations and learner support'},
  {name:'MAHE', type:'University offering online and professional programs', audience:'Graduates and professionals', formats:'Online and professional higher education', compare:'Program type, eligibility, curriculum, delivery model and fees'},
  {name:'Lovely Professional University', type:'Online degree university', audience:'Students, graduates and professionals', formats:'Online UG and PG degrees', compare:'Program range, fees, platform, examinations and support'},
  {name:'Shoolini University', type:'Online degree university', audience:'Students and working professionals', formats:'Selected online degree programs', compare:'Program availability, curriculum, fees and learning support'},
  {name:'UPES Online', type:'Online higher education provider', audience:'Graduates and working professionals', formats:'Online management and specialised programs', compare:'Specialisation, curriculum relevance, fees, format and support'},
  {name:'Parul University', type:'Online degree university', audience:'Students and working professionals', formats:'Selected online UG and PG programs', compare:'Program choice, eligibility, fees, examinations and support'},
  {name:'VIT Online', type:'University offering online programs', audience:'Graduates and technology-focused professionals', formats:'Selected online and technology-focused programs', compare:'Program type, curriculum, eligibility, fees and learning format'},
  {name:'IIM Ahmedabad', type:'Executive education institution', audience:'Experienced working professionals and leaders', formats:'Executive and management development programs', compare:'Experience requirement, credential, duration, campus component, fees and career fit'},
  {name:'IIM Kozhikode', type:'Executive education institution', audience:'Experienced working professionals', formats:'Executive management and leadership programs', compare:'Eligibility, program structure, credential, fees, schedule and networking'},
  {name:'IIM Indore', type:'Executive education institution', audience:'Experienced professionals and managers', formats:'Executive education and leadership programs', compare:'Experience requirement, curriculum, duration, fees, schedule and career fit'}
];

const compareA = document.getElementById('compareA');
const compareB = document.getElementById('compareB');
const comparisonOutput = document.getElementById('comparisonOutput');
const comparisonWhatsApp = document.getElementById('comparisonWhatsApp');

function addComparisonOptions(select, selectedIndex) {
  if (!select) return;
  select.innerHTML = institutionData
    .map((item, index) => `<option value="${index}" ${index === selectedIndex ? 'selected' : ''}>${item.name}</option>`)
    .join('');
}

function renderComparison() {
  if (!compareA || !compareB || !comparisonOutput) return;
  const first = institutionData[Number(compareA.value)];
  const second = institutionData[Number(compareB.value)];

  const rows = [
    ['Institution type', first.type, second.type],
    ['Best suited for', first.audience, second.audience],
    ['Program format', first.formats, second.formats],
    ['Key points to verify', first.compare, second.compare],
    ['Current fees & intake', 'Request the latest verified details', 'Request the latest verified details']
  ];

  comparisonOutput.innerHTML = `
    <table class="comparison-table">
      <thead><tr><th>Comparison point</th><th>${first.name}</th><th>${second.name}</th></tr></thead>
      <tbody>${rows.map(row => `<tr><th>${row[0]}</th><td>${row[1]}</td><td>${row[2]}</td></tr>`).join('')}</tbody>
    </table>`;

  if (comparisonWhatsApp) {
    const message = `Hi Nitin, I want to compare ${first.name} and ${second.name}. Please share the latest program options, eligibility, fees, EMI/scholarship details, examination format and your recommendation for my profile.`;
    comparisonWhatsApp.href = `https://wa.me/917208354187?text=${encodeURIComponent(message)}`;
  }
}

if (compareA && compareB) {
  addComparisonOptions(compareA, 0);
  addComparisonOptions(compareB, 1);
  compareA.addEventListener('change', renderComparison);
  compareB.addEventListener('change', renderComparison);
  renderComparison();
}


// CareerDekho profile builder
const profileForm = document.getElementById('profileForm');
profileForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('profileName')?.value.trim() || '';
  const qualification = document.getElementById('profileQualification')?.value.trim() || '';
  const experience = document.getElementById('profileExperience')?.value.trim() || 'Not specified';
  const budget = document.getElementById('profileBudget')?.value.trim() || 'Not specified';
  const program = document.getElementById('profileProgram')?.value || 'Not specified';
  const university = document.getElementById('profileUniversity')?.value.trim() || 'Open to recommendations';
  const goal = document.getElementById('profileGoal')?.value.trim() || 'Not specified';

  const message = `Hi CareerDekho Team,

My name is ${name}.

Qualification: ${qualification}
Work experience: ${experience}
Approximate budget: ${budget}
Interested program: ${program}
Preferred university/institution: ${university}
Career goal: ${goal}

Please help me shortlist suitable options.`;

  window.open(`https://wa.me/917208354187?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

// Apply search query on universities page
if (directorySearch) {
  const params = new URLSearchParams(window.location.search);
  const initialSearch = params.get('search');
  if (initialSearch) {
    directorySearch.value = initialSearch;
    updateDirectory();
  }
}
