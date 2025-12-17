/**
 * Zip Code Coordinates Lookup
 * Contains lat/lng for zip codes in Bridges service areas
 * Data sourced from US Census Bureau zip code centroids
 */

// Major city coordinates (fallback when zip code not found)
const CITY_COORDS = {
    'atlanta': { lat: 33.749, lng: -84.388 },
    'boston': { lat: 42.361, lng: -71.057 },
    'chicago': { lat: 41.878, lng: -87.630 },
    'dallas': { lat: 32.777, lng: -96.797 },
    'fort worth': { lat: 32.755, lng: -97.331 },
    'los angeles': { lat: 34.052, lng: -118.244 },
    'new york': { lat: 40.713, lng: -74.006 },
    'new york city': { lat: 40.713, lng: -74.006 },
    'oakland': { lat: 37.805, lng: -122.271 },
    'philadelphia': { lat: 39.953, lng: -75.164 },
    'richmond': { lat: 37.929, lng: -122.353 },
    'san francisco': { lat: 37.775, lng: -122.418 }
};

// Zip code coordinates for Bridges service areas
// Format: 'XXXXX': { lat: XX.XXX, lng: -XX.XXX }
const ZIP_COORDS = {
    // Atlanta, GA area
    '30301': { lat: 33.749, lng: -84.388 },
    '30302': { lat: 33.754, lng: -84.391 },
    '30303': { lat: 33.752, lng: -84.392 },
    '30304': { lat: 33.771, lng: -84.385 },
    '30305': { lat: 33.833, lng: -84.381 },
    '30306': { lat: 33.787, lng: -84.352 },
    '30307': { lat: 33.771, lng: -84.340 },
    '30308': { lat: 33.772, lng: -84.373 },
    '30309': { lat: 33.795, lng: -84.384 },
    '30310': { lat: 33.726, lng: -84.423 },
    '30311': { lat: 33.718, lng: -84.472 },
    '30312': { lat: 33.742, lng: -84.375 },
    '30313': { lat: 33.761, lng: -84.404 },
    '30314': { lat: 33.758, lng: -84.433 },
    '30315': { lat: 33.704, lng: -84.388 },
    '30316': { lat: 33.724, lng: -84.332 },
    '30317': { lat: 33.749, lng: -84.316 },
    '30318': { lat: 33.795, lng: -84.436 },
    '30319': { lat: 33.874, lng: -84.336 },
    '30324': { lat: 33.820, lng: -84.356 },
    '30326': { lat: 33.851, lng: -84.362 },
    '30327': { lat: 33.866, lng: -84.421 },
    '30328': { lat: 33.931, lng: -84.379 },
    '30329': { lat: 33.826, lng: -84.324 },
    '30331': { lat: 33.694, lng: -84.534 },
    '30332': { lat: 33.777, lng: -84.396 },
    '30334': { lat: 33.749, lng: -84.388 },
    '30336': { lat: 33.732, lng: -84.570 },
    '30337': { lat: 33.633, lng: -84.446 },
    '30338': { lat: 33.942, lng: -84.320 },
    '30339': { lat: 33.881, lng: -84.461 },
    '30340': { lat: 33.896, lng: -84.252 },
    '30341': { lat: 33.887, lng: -84.284 },
    '30342': { lat: 33.880, lng: -84.379 },
    '30344': { lat: 33.674, lng: -84.467 },
    '30345': { lat: 33.855, lng: -84.287 },
    '30346': { lat: 33.927, lng: -84.341 },
    '30349': { lat: 33.582, lng: -84.510 },
    '30350': { lat: 33.979, lng: -84.329 },
    '30354': { lat: 33.640, lng: -84.385 },
    '30360': { lat: 33.931, lng: -84.271 },
    '30363': { lat: 33.787, lng: -84.406 },

    // Boston, MA area
    '02101': { lat: 42.370, lng: -71.027 },
    '02102': { lat: 42.361, lng: -71.057 },
    '02103': { lat: 42.361, lng: -71.057 },
    '02104': { lat: 42.361, lng: -71.057 },
    '02105': { lat: 42.361, lng: -71.057 },
    '02106': { lat: 42.357, lng: -71.055 },
    '02107': { lat: 42.361, lng: -71.057 },
    '02108': { lat: 42.357, lng: -71.065 },
    '02109': { lat: 42.365, lng: -71.052 },
    '02110': { lat: 42.357, lng: -71.049 },
    '02111': { lat: 42.351, lng: -71.059 },
    '02112': { lat: 42.361, lng: -71.057 },
    '02113': { lat: 42.365, lng: -71.055 },
    '02114': { lat: 42.362, lng: -71.067 },
    '02115': { lat: 42.342, lng: -71.085 },
    '02116': { lat: 42.350, lng: -71.078 },
    '02117': { lat: 42.361, lng: -71.057 },
    '02118': { lat: 42.338, lng: -71.073 },
    '02119': { lat: 42.323, lng: -71.085 },
    '02120': { lat: 42.333, lng: -71.097 },
    '02121': { lat: 42.306, lng: -71.086 },
    '02122': { lat: 42.287, lng: -71.050 },
    '02124': { lat: 42.287, lng: -71.073 },
    '02125': { lat: 42.316, lng: -71.057 },
    '02126': { lat: 42.272, lng: -71.094 },
    '02127': { lat: 42.336, lng: -71.038 },
    '02128': { lat: 42.374, lng: -71.013 },
    '02129': { lat: 42.380, lng: -71.060 },
    '02130': { lat: 42.309, lng: -71.113 },
    '02131': { lat: 42.284, lng: -71.123 },
    '02132': { lat: 42.281, lng: -71.165 },
    '02134': { lat: 42.357, lng: -71.129 },
    '02135': { lat: 42.352, lng: -71.154 },
    '02136': { lat: 42.255, lng: -71.129 },
    '02163': { lat: 42.374, lng: -71.119 },
    '02199': { lat: 42.347, lng: -71.082 },
    '02210': { lat: 42.348, lng: -71.038 },
    '02215': { lat: 42.347, lng: -71.103 },

    // Chicago, IL area
    '60601': { lat: 41.886, lng: -87.618 },
    '60602': { lat: 41.883, lng: -87.628 },
    '60603': { lat: 41.880, lng: -87.625 },
    '60604': { lat: 41.878, lng: -87.629 },
    '60605': { lat: 41.866, lng: -87.618 },
    '60606': { lat: 41.883, lng: -87.640 },
    '60607': { lat: 41.873, lng: -87.657 },
    '60608': { lat: 41.851, lng: -87.670 },
    '60609': { lat: 41.810, lng: -87.655 },
    '60610': { lat: 41.904, lng: -87.637 },
    '60611': { lat: 41.895, lng: -87.616 },
    '60612': { lat: 41.879, lng: -87.690 },
    '60613': { lat: 41.954, lng: -87.659 },
    '60614': { lat: 41.924, lng: -87.651 },
    '60615': { lat: 41.802, lng: -87.600 },
    '60616': { lat: 41.843, lng: -87.625 },
    '60617': { lat: 41.716, lng: -87.557 },
    '60618': { lat: 41.946, lng: -87.704 },
    '60619': { lat: 41.747, lng: -87.604 },
    '60620': { lat: 41.741, lng: -87.654 },
    '60621': { lat: 41.776, lng: -87.644 },
    '60622': { lat: 41.902, lng: -87.677 },
    '60623': { lat: 41.849, lng: -87.717 },
    '60624': { lat: 41.881, lng: -87.724 },
    '60625': { lat: 41.971, lng: -87.704 },
    '60626': { lat: 42.009, lng: -87.671 },
    '60628': { lat: 41.693, lng: -87.614 },
    '60629': { lat: 41.778, lng: -87.710 },
    '60630': { lat: 41.970, lng: -87.760 },
    '60631': { lat: 41.994, lng: -87.812 },
    '60632': { lat: 41.810, lng: -87.705 },
    '60633': { lat: 41.657, lng: -87.548 },
    '60634': { lat: 41.944, lng: -87.812 },
    '60636': { lat: 41.776, lng: -87.668 },
    '60637': { lat: 41.783, lng: -87.600 },
    '60638': { lat: 41.786, lng: -87.772 },
    '60639': { lat: 41.921, lng: -87.757 },
    '60640': { lat: 41.973, lng: -87.663 },
    '60641': { lat: 41.947, lng: -87.746 },
    '60642': { lat: 41.903, lng: -87.664 },
    '60643': { lat: 41.699, lng: -87.669 },
    '60644': { lat: 41.881, lng: -87.757 },
    '60645': { lat: 42.008, lng: -87.698 },
    '60646': { lat: 41.995, lng: -87.756 },
    '60647': { lat: 41.921, lng: -87.704 },
    '60649': { lat: 41.762, lng: -87.566 },
    '60651': { lat: 41.901, lng: -87.739 },
    '60652': { lat: 41.745, lng: -87.713 },
    '60653': { lat: 41.817, lng: -87.610 },
    '60654': { lat: 41.893, lng: -87.638 },
    '60655': { lat: 41.696, lng: -87.704 },
    '60656': { lat: 41.971, lng: -87.846 },
    '60657': { lat: 41.940, lng: -87.653 },
    '60659': { lat: 41.990, lng: -87.705 },
    '60660': { lat: 41.990, lng: -87.662 },
    '60661': { lat: 41.882, lng: -87.644 },

    // Dallas, TX area
    '75201': { lat: 32.789, lng: -96.798 },
    '75202': { lat: 32.781, lng: -96.801 },
    '75203': { lat: 32.751, lng: -96.832 },
    '75204': { lat: 32.801, lng: -96.787 },
    '75205': { lat: 32.837, lng: -96.797 },
    '75206': { lat: 32.822, lng: -96.770 },
    '75207': { lat: 32.783, lng: -96.825 },
    '75208': { lat: 32.756, lng: -96.861 },
    '75209': { lat: 32.847, lng: -96.825 },
    '75210': { lat: 32.775, lng: -96.753 },
    '75211': { lat: 32.749, lng: -96.887 },
    '75212': { lat: 32.779, lng: -96.876 },
    '75214': { lat: 32.823, lng: -96.741 },
    '75215': { lat: 32.756, lng: -96.761 },
    '75216': { lat: 32.715, lng: -96.803 },
    '75217': { lat: 32.720, lng: -96.687 },
    '75218': { lat: 32.841, lng: -96.702 },
    '75219': { lat: 32.809, lng: -96.811 },
    '75220': { lat: 32.863, lng: -96.869 },
    '75223': { lat: 32.787, lng: -96.746 },
    '75224': { lat: 32.728, lng: -96.851 },
    '75225': { lat: 32.863, lng: -96.784 },
    '75226': { lat: 32.780, lng: -96.770 },
    '75227': { lat: 32.771, lng: -96.696 },
    '75228': { lat: 32.809, lng: -96.677 },
    '75229': { lat: 32.895, lng: -96.866 },
    '75230': { lat: 32.907, lng: -96.795 },
    '75231': { lat: 32.877, lng: -96.750 },
    '75232': { lat: 32.672, lng: -96.840 },
    '75233': { lat: 32.713, lng: -96.866 },
    '75234': { lat: 32.926, lng: -96.890 },
    '75235': { lat: 32.834, lng: -96.841 },
    '75236': { lat: 32.693, lng: -96.898 },
    '75237': { lat: 32.672, lng: -96.866 },
    '75238': { lat: 32.877, lng: -96.702 },
    '75240': { lat: 32.943, lng: -96.797 },
    '75241': { lat: 32.652, lng: -96.762 },
    '75243': { lat: 32.911, lng: -96.744 },
    '75244': { lat: 32.932, lng: -96.841 },
    '75246': { lat: 32.790, lng: -96.783 },
    '75247': { lat: 32.816, lng: -96.858 },
    '75248': { lat: 32.972, lng: -96.797 },
    '75249': { lat: 32.662, lng: -96.930 },
    '75251': { lat: 32.914, lng: -96.773 },
    '75252': { lat: 32.996, lng: -96.797 },
    '75253': { lat: 32.688, lng: -96.620 },
    '75254': { lat: 32.961, lng: -96.841 },

    // Fort Worth, TX area
    '76101': { lat: 32.755, lng: -97.331 },
    '76102': { lat: 32.757, lng: -97.328 },
    '76103': { lat: 32.748, lng: -97.283 },
    '76104': { lat: 32.738, lng: -97.326 },
    '76105': { lat: 32.721, lng: -97.284 },
    '76106': { lat: 32.781, lng: -97.360 },
    '76107': { lat: 32.758, lng: -97.384 },
    '76108': { lat: 32.777, lng: -97.477 },
    '76109': { lat: 32.705, lng: -97.384 },
    '76110': { lat: 32.713, lng: -97.342 },
    '76111': { lat: 32.782, lng: -97.303 },
    '76112': { lat: 32.751, lng: -97.230 },
    '76114': { lat: 32.800, lng: -97.406 },
    '76115': { lat: 32.680, lng: -97.338 },
    '76116': { lat: 32.728, lng: -97.450 },
    '76117': { lat: 32.792, lng: -97.273 },
    '76118': { lat: 32.823, lng: -97.230 },
    '76119': { lat: 32.689, lng: -97.276 },
    '76120': { lat: 32.764, lng: -97.201 },
    '76123': { lat: 32.621, lng: -97.399 },
    '76126': { lat: 32.663, lng: -97.498 },
    '76129': { lat: 32.709, lng: -97.363 },
    '76131': { lat: 32.879, lng: -97.371 },
    '76132': { lat: 32.681, lng: -97.420 },
    '76133': { lat: 32.651, lng: -97.379 },
    '76134': { lat: 32.642, lng: -97.335 },
    '76135': { lat: 32.830, lng: -97.447 },
    '76137': { lat: 32.863, lng: -97.300 },
    '76140': { lat: 32.600, lng: -97.310 },

    // Los Angeles, CA area
    '90001': { lat: 33.941, lng: -118.248 },
    '90002': { lat: 33.949, lng: -118.247 },
    '90003': { lat: 33.964, lng: -118.273 },
    '90004': { lat: 34.076, lng: -118.309 },
    '90005': { lat: 34.059, lng: -118.309 },
    '90006': { lat: 34.048, lng: -118.294 },
    '90007': { lat: 34.029, lng: -118.283 },
    '90008': { lat: 34.010, lng: -118.341 },
    '90010': { lat: 34.061, lng: -118.316 },
    '90011': { lat: 34.007, lng: -118.258 },
    '90012': { lat: 34.062, lng: -118.240 },
    '90013': { lat: 34.044, lng: -118.242 },
    '90014': { lat: 34.040, lng: -118.256 },
    '90015': { lat: 34.039, lng: -118.269 },
    '90016': { lat: 34.029, lng: -118.352 },
    '90017': { lat: 34.053, lng: -118.264 },
    '90018': { lat: 34.028, lng: -118.316 },
    '90019': { lat: 34.047, lng: -118.338 },
    '90020': { lat: 34.066, lng: -118.309 },
    '90021': { lat: 34.030, lng: -118.240 },
    '90022': { lat: 34.024, lng: -118.156 },
    '90023': { lat: 34.019, lng: -118.196 },
    '90024': { lat: 34.065, lng: -118.437 },
    '90025': { lat: 34.042, lng: -118.448 },
    '90026': { lat: 34.077, lng: -118.261 },
    '90027': { lat: 34.113, lng: -118.286 },
    '90028': { lat: 34.100, lng: -118.326 },
    '90029': { lat: 34.090, lng: -118.294 },
    '90031': { lat: 34.081, lng: -118.210 },
    '90032': { lat: 34.079, lng: -118.176 },
    '90033': { lat: 34.050, lng: -118.210 },
    '90034': { lat: 34.028, lng: -118.401 },
    '90035': { lat: 34.052, lng: -118.379 },
    '90036': { lat: 34.069, lng: -118.354 },
    '90037': { lat: 34.004, lng: -118.284 },
    '90038': { lat: 34.089, lng: -118.326 },
    '90039': { lat: 34.114, lng: -118.262 },
    '90040': { lat: 33.991, lng: -118.151 },
    '90041': { lat: 34.137, lng: -118.208 },
    '90042': { lat: 34.115, lng: -118.192 },
    '90043': { lat: 33.988, lng: -118.330 },
    '90044': { lat: 33.953, lng: -118.292 },
    '90045': { lat: 33.961, lng: -118.400 },
    '90046': { lat: 34.106, lng: -118.369 },
    '90047': { lat: 33.957, lng: -118.311 },
    '90048': { lat: 34.073, lng: -118.372 },
    '90049': { lat: 34.075, lng: -118.478 },
    '90056': { lat: 33.990, lng: -118.370 },
    '90057': { lat: 34.064, lng: -118.278 },
    '90058': { lat: 33.991, lng: -118.213 },
    '90059': { lat: 33.924, lng: -118.244 },
    '90061': { lat: 33.922, lng: -118.275 },
    '90062': { lat: 34.004, lng: -118.307 },
    '90063': { lat: 34.043, lng: -118.184 },
    '90064': { lat: 34.032, lng: -118.426 },
    '90065': { lat: 34.108, lng: -118.225 },
    '90066': { lat: 34.002, lng: -118.432 },
    '90067': { lat: 34.057, lng: -118.414 },
    '90068': { lat: 34.123, lng: -118.325 },
    '90069': { lat: 34.090, lng: -118.381 },
    '90071': { lat: 34.051, lng: -118.256 },
    '90077': { lat: 34.100, lng: -118.448 },
    '90094': { lat: 33.974, lng: -118.425 },
    '90210': { lat: 34.090, lng: -118.410 },
    '90211': { lat: 34.064, lng: -118.386 },
    '90212': { lat: 34.057, lng: -118.400 },
    '90230': { lat: 33.996, lng: -118.390 },
    '90232': { lat: 34.010, lng: -118.397 },
    '90291': { lat: 33.996, lng: -118.472 },
    '90292': { lat: 33.976, lng: -118.448 },
    '90293': { lat: 33.955, lng: -118.458 },
    '90301': { lat: 33.953, lng: -118.352 },
    '90302': { lat: 33.970, lng: -118.347 },
    '90303': { lat: 33.937, lng: -118.330 },
    '90304': { lat: 33.932, lng: -118.361 },
    '90305': { lat: 33.962, lng: -118.361 },

    // New York City area
    '10001': { lat: 40.750, lng: -73.997 },
    '10002': { lat: 40.716, lng: -73.986 },
    '10003': { lat: 40.732, lng: -73.989 },
    '10004': { lat: 40.699, lng: -74.041 },
    '10005': { lat: 40.706, lng: -74.009 },
    '10006': { lat: 40.710, lng: -74.013 },
    '10007': { lat: 40.714, lng: -74.008 },
    '10008': { lat: 40.711, lng: -74.001 },
    '10009': { lat: 40.726, lng: -73.978 },
    '10010': { lat: 40.739, lng: -73.983 },
    '10011': { lat: 40.741, lng: -74.000 },
    '10012': { lat: 40.726, lng: -73.998 },
    '10013': { lat: 40.720, lng: -74.005 },
    '10014': { lat: 40.734, lng: -74.005 },
    '10016': { lat: 40.745, lng: -73.978 },
    '10017': { lat: 40.752, lng: -73.973 },
    '10018': { lat: 40.755, lng: -73.993 },
    '10019': { lat: 40.765, lng: -73.985 },
    '10020': { lat: 40.759, lng: -73.979 },
    '10021': { lat: 40.769, lng: -73.959 },
    '10022': { lat: 40.758, lng: -73.967 },
    '10023': { lat: 40.776, lng: -73.982 },
    '10024': { lat: 40.790, lng: -73.972 },
    '10025': { lat: 40.799, lng: -73.968 },
    '10026': { lat: 40.802, lng: -73.953 },
    '10027': { lat: 40.812, lng: -73.953 },
    '10028': { lat: 40.776, lng: -73.954 },
    '10029': { lat: 40.792, lng: -73.944 },
    '10030': { lat: 40.818, lng: -73.943 },
    '10031': { lat: 40.825, lng: -73.950 },
    '10032': { lat: 40.838, lng: -73.943 },
    '10033': { lat: 40.850, lng: -73.934 },
    '10034': { lat: 40.867, lng: -73.923 },
    '10035': { lat: 40.801, lng: -73.935 },
    '10036': { lat: 40.759, lng: -73.990 },
    '10037': { lat: 40.813, lng: -73.937 },
    '10038': { lat: 40.709, lng: -74.002 },
    '10039': { lat: 40.828, lng: -73.936 },
    '10040': { lat: 40.858, lng: -73.929 },
    '10044': { lat: 40.762, lng: -73.950 },
    '10065': { lat: 40.765, lng: -73.963 },
    '10069': { lat: 40.777, lng: -73.990 },
    '10075': { lat: 40.773, lng: -73.956 },
    '10128': { lat: 40.781, lng: -73.950 },
    '10280': { lat: 40.711, lng: -74.016 },
    '10282': { lat: 40.717, lng: -74.014 },
    // Brooklyn
    '11201': { lat: 40.694, lng: -73.990 },
    '11203': { lat: 40.649, lng: -73.935 },
    '11204': { lat: 40.619, lng: -73.984 },
    '11205': { lat: 40.694, lng: -73.966 },
    '11206': { lat: 40.702, lng: -73.943 },
    '11207': { lat: 40.670, lng: -73.894 },
    '11208': { lat: 40.669, lng: -73.872 },
    '11209': { lat: 40.622, lng: -74.030 },
    '11210': { lat: 40.628, lng: -73.947 },
    '11211': { lat: 40.713, lng: -73.954 },
    '11212': { lat: 40.663, lng: -73.913 },
    '11213': { lat: 40.671, lng: -73.936 },
    '11214': { lat: 40.599, lng: -73.996 },
    '11215': { lat: 40.667, lng: -73.986 },
    '11216': { lat: 40.680, lng: -73.949 },
    '11217': { lat: 40.682, lng: -73.979 },
    '11218': { lat: 40.643, lng: -73.977 },
    '11219': { lat: 40.633, lng: -73.997 },
    '11220': { lat: 40.641, lng: -74.017 },
    '11221': { lat: 40.691, lng: -73.927 },
    '11222': { lat: 40.727, lng: -73.949 },
    '11223': { lat: 40.597, lng: -73.973 },
    '11224': { lat: 40.577, lng: -73.989 },
    '11225': { lat: 40.663, lng: -73.954 },
    '11226': { lat: 40.646, lng: -73.957 },
    '11228': { lat: 40.617, lng: -74.013 },
    '11229': { lat: 40.601, lng: -73.944 },
    '11230': { lat: 40.622, lng: -73.966 },
    '11231': { lat: 40.678, lng: -74.000 },
    '11232': { lat: 40.657, lng: -74.005 },
    '11233': { lat: 40.678, lng: -73.920 },
    '11234': { lat: 40.609, lng: -73.922 },
    '11235': { lat: 40.584, lng: -73.949 },
    '11236': { lat: 40.639, lng: -73.901 },
    '11237': { lat: 40.704, lng: -73.921 },
    '11238': { lat: 40.679, lng: -73.964 },
    '11239': { lat: 40.652, lng: -73.879 },
    // Bronx
    '10451': { lat: 40.820, lng: -73.924 },
    '10452': { lat: 40.838, lng: -73.923 },
    '10453': { lat: 40.853, lng: -73.912 },
    '10454': { lat: 40.807, lng: -73.916 },
    '10455': { lat: 40.815, lng: -73.908 },
    '10456': { lat: 40.831, lng: -73.908 },
    '10457': { lat: 40.847, lng: -73.898 },
    '10458': { lat: 40.862, lng: -73.886 },
    '10459': { lat: 40.826, lng: -73.894 },
    '10460': { lat: 40.842, lng: -73.879 },
    '10461': { lat: 40.845, lng: -73.841 },
    '10462': { lat: 40.843, lng: -73.858 },
    '10463': { lat: 40.880, lng: -73.906 },
    '10464': { lat: 40.867, lng: -73.803 },
    '10465': { lat: 40.823, lng: -73.822 },
    '10466': { lat: 40.890, lng: -73.847 },
    '10467': { lat: 40.873, lng: -73.871 },
    '10468': { lat: 40.868, lng: -73.900 },
    '10469': { lat: 40.869, lng: -73.847 },
    '10470': { lat: 40.896, lng: -73.868 },
    '10471': { lat: 40.899, lng: -73.898 },
    '10472': { lat: 40.830, lng: -73.869 },
    '10473': { lat: 40.819, lng: -73.858 },
    '10474': { lat: 40.811, lng: -73.886 },
    '10475': { lat: 40.875, lng: -73.828 },
    // Queens
    '11101': { lat: 40.746, lng: -73.936 },
    '11102': { lat: 40.773, lng: -73.926 },
    '11103': { lat: 40.762, lng: -73.914 },
    '11104': { lat: 40.744, lng: -73.920 },
    '11105': { lat: 40.779, lng: -73.906 },
    '11106': { lat: 40.762, lng: -73.932 },
    '11354': { lat: 40.768, lng: -73.827 },
    '11355': { lat: 40.751, lng: -73.822 },
    '11356': { lat: 40.784, lng: -73.843 },
    '11357': { lat: 40.786, lng: -73.819 },
    '11358': { lat: 40.760, lng: -73.796 },
    '11360': { lat: 40.781, lng: -73.781 },
    '11361': { lat: 40.764, lng: -73.773 },
    '11362': { lat: 40.756, lng: -73.736 },
    '11363': { lat: 40.773, lng: -73.746 },
    '11364': { lat: 40.745, lng: -73.760 },
    '11365': { lat: 40.740, lng: -73.793 },
    '11366': { lat: 40.728, lng: -73.786 },
    '11367': { lat: 40.730, lng: -73.823 },
    '11368': { lat: 40.749, lng: -73.852 },
    '11369': { lat: 40.763, lng: -73.876 },
    '11370': { lat: 40.765, lng: -73.893 },
    '11372': { lat: 40.752, lng: -73.883 },
    '11373': { lat: 40.739, lng: -73.878 },
    '11374': { lat: 40.726, lng: -73.861 },
    '11375': { lat: 40.721, lng: -73.846 },
    '11377': { lat: 40.745, lng: -73.905 },
    '11378': { lat: 40.725, lng: -73.909 },
    '11379': { lat: 40.717, lng: -73.879 },
    '11385': { lat: 40.701, lng: -73.890 },

    // Oakland, CA area
    '94601': { lat: 37.776, lng: -122.224 },
    '94602': { lat: 37.810, lng: -122.215 },
    '94603': { lat: 37.738, lng: -122.184 },
    '94605': { lat: 37.765, lng: -122.164 },
    '94606': { lat: 37.791, lng: -122.244 },
    '94607': { lat: 37.806, lng: -122.297 },
    '94608': { lat: 37.836, lng: -122.284 },
    '94609': { lat: 37.835, lng: -122.264 },
    '94610': { lat: 37.812, lng: -122.243 },
    '94611': { lat: 37.830, lng: -122.214 },
    '94612': { lat: 37.804, lng: -122.270 },
    '94613': { lat: 37.781, lng: -122.184 },
    '94618': { lat: 37.845, lng: -122.243 },
    '94619': { lat: 37.787, lng: -122.182 },
    '94621': { lat: 37.752, lng: -122.211 },

    // Philadelphia, PA area
    '19102': { lat: 39.952, lng: -75.165 },
    '19103': { lat: 39.953, lng: -75.175 },
    '19104': { lat: 39.959, lng: -75.199 },
    '19106': { lat: 39.949, lng: -75.147 },
    '19107': { lat: 39.951, lng: -75.159 },
    '19109': { lat: 39.949, lng: -75.163 },
    '19111': { lat: 40.058, lng: -75.079 },
    '19112': { lat: 39.893, lng: -75.179 },
    '19114': { lat: 40.066, lng: -75.002 },
    '19115': { lat: 40.093, lng: -75.042 },
    '19116': { lat: 40.113, lng: -75.012 },
    '19118': { lat: 40.072, lng: -75.207 },
    '19119': { lat: 40.054, lng: -75.186 },
    '19120': { lat: 40.033, lng: -75.118 },
    '19121': { lat: 39.979, lng: -75.176 },
    '19122': { lat: 39.976, lng: -75.145 },
    '19123': { lat: 39.964, lng: -75.148 },
    '19124': { lat: 40.018, lng: -75.093 },
    '19125': { lat: 39.975, lng: -75.132 },
    '19126': { lat: 40.056, lng: -75.139 },
    '19127': { lat: 40.027, lng: -75.227 },
    '19128': { lat: 40.048, lng: -75.228 },
    '19129': { lat: 40.010, lng: -75.187 },
    '19130': { lat: 39.966, lng: -75.176 },
    '19131': { lat: 39.990, lng: -75.225 },
    '19132': { lat: 39.999, lng: -75.170 },
    '19133': { lat: 39.993, lng: -75.136 },
    '19134': { lat: 39.991, lng: -75.108 },
    '19135': { lat: 40.024, lng: -75.048 },
    '19136': { lat: 40.044, lng: -75.024 },
    '19137': { lat: 39.994, lng: -75.073 },
    '19138': { lat: 40.058, lng: -75.159 },
    '19139': { lat: 39.960, lng: -75.230 },
    '19140': { lat: 40.012, lng: -75.145 },
    '19141': { lat: 40.038, lng: -75.145 },
    '19142': { lat: 39.923, lng: -75.230 },
    '19143': { lat: 39.944, lng: -75.228 },
    '19144': { lat: 40.034, lng: -75.173 },
    '19145': { lat: 39.915, lng: -75.192 },
    '19146': { lat: 39.939, lng: -75.179 },
    '19147': { lat: 39.937, lng: -75.156 },
    '19148': { lat: 39.914, lng: -75.153 },
    '19149': { lat: 40.038, lng: -75.066 },
    '19150': { lat: 40.073, lng: -75.169 },
    '19151': { lat: 39.978, lng: -75.255 },
    '19152': { lat: 40.061, lng: -75.046 },
    '19153': { lat: 39.892, lng: -75.234 },
    '19154': { lat: 40.095, lng: -74.982 },

    // Richmond, CA area (East Bay)
    '94801': { lat: 37.935, lng: -122.365 },
    '94802': { lat: 37.936, lng: -122.354 },
    '94803': { lat: 37.958, lng: -122.337 },
    '94804': { lat: 37.920, lng: -122.355 },
    '94805': { lat: 37.935, lng: -122.336 },
    '94806': { lat: 37.965, lng: -122.355 },
    '94850': { lat: 37.918, lng: -122.325 },

    // San Francisco, CA area
    '94102': { lat: 37.779, lng: -122.419 },
    '94103': { lat: 37.772, lng: -122.411 },
    '94104': { lat: 37.791, lng: -122.402 },
    '94105': { lat: 37.789, lng: -122.395 },
    '94107': { lat: 37.766, lng: -122.396 },
    '94108': { lat: 37.792, lng: -122.408 },
    '94109': { lat: 37.793, lng: -122.422 },
    '94110': { lat: 37.749, lng: -122.415 },
    '94111': { lat: 37.798, lng: -122.400 },
    '94112': { lat: 37.720, lng: -122.443 },
    '94114': { lat: 37.759, lng: -122.435 },
    '94115': { lat: 37.786, lng: -122.437 },
    '94116': { lat: 37.744, lng: -122.485 },
    '94117': { lat: 37.771, lng: -122.443 },
    '94118': { lat: 37.782, lng: -122.461 },
    '94121': { lat: 37.779, lng: -122.494 },
    '94122': { lat: 37.760, lng: -122.484 },
    '94123': { lat: 37.800, lng: -122.436 },
    '94124': { lat: 37.731, lng: -122.388 },
    '94127': { lat: 37.736, lng: -122.459 },
    '94129': { lat: 37.799, lng: -122.466 },
    '94130': { lat: 37.823, lng: -122.370 },
    '94131': { lat: 37.742, lng: -122.438 },
    '94132': { lat: 37.722, lng: -122.483 },
    '94133': { lat: 37.801, lng: -122.410 },
    '94134': { lat: 37.719, lng: -122.413 },
    '94158': { lat: 37.770, lng: -122.387 }
};

/**
 * Get coordinates for a zip code
 * @param {string} zipCode - 5-digit zip code
 * @returns {object|null} - { lat, lng } or null if not found
 */
function getZipCoords(zipCode) {
    if (!zipCode) return null;
    const zip5 = zipCode.substring(0, 5);
    return ZIP_COORDS[zip5] || null;
}

/**
 * Get coordinates for a city name
 * @param {string} city - City name
 * @returns {object|null} - { lat, lng } or null if not found
 */
function getCityCoords(city) {
    if (!city) return null;
    const normalized = city.toLowerCase().trim();
    return CITY_COORDS[normalized] || null;
}

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lng1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lng2 - Longitude of point 2
 * @returns {number} - Distance in miles
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Get distance between participant location and job location
 * @param {string} participantZip - Participant's zip code
 * @param {string} participantCity - Participant's city/site (fallback)
 * @param {object} job - Job object with latitude, longitude, city, state, zipCode
 * @returns {number|null} - Distance in miles or null if can't calculate
 */
function getJobDistance(participantZip, participantCity, job) {
    // First, use geocoded participant coordinates if available (most accurate)
    let participantCoords = appState.participantCoords;

    // Fall back to zip code lookup
    if (!participantCoords && participantZip) {
        participantCoords = getZipCoords(participantZip);
    }

    // Fall back to city lookup
    if (!participantCoords && participantCity) {
        participantCoords = getCityCoords(participantCity);
    }

    if (!participantCoords) return null;

    // First, check if job has latitude/longitude from API (most accurate)
    let jobCoords = null;
    if (job.latitude && job.longitude) {
        jobCoords = { lat: job.latitude, lng: job.longitude };
    }

    // Fall back to job zip code lookup
    if (!jobCoords) {
        jobCoords = getZipCoords(job.zipCode);
    }

    // Fall back to city coordinates
    if (!jobCoords && job.city) {
        jobCoords = getCityCoords(job.city);
    }

    // Fall back to parsing location string (e.g., "Atlanta, Georgia, USA")
    if (!jobCoords && job.location) {
        const locationParts = job.location.split(',').map(p => p.trim().toLowerCase());
        for (const part of locationParts) {
            jobCoords = getCityCoords(part);
            if (jobCoords) break;
        }
    }

    if (!jobCoords) return null;

    return calculateDistance(
        participantCoords.lat, participantCoords.lng,
        jobCoords.lat, jobCoords.lng
    );
}

/**
 * Format distance for display
 * @param {number} distance - Distance in miles
 * @returns {string} - Formatted distance string
 */
function formatDistance(distance) {
    if (distance === null || distance === undefined) return '';
    if (distance < 1) {
        return '< 1 mi';
    } else if (distance < 10) {
        return distance.toFixed(1) + ' mi';
    } else {
        return Math.round(distance) + ' mi';
    }
}

/**
 * Geocode participant's address using US Census Geocoding API (free, no API key required)
 * Falls back to zip code lookup if geocoding fails
 * @returns {Promise<{lat: number, lng: number}|null>}
 */
async function geocodeParticipantAddress() {
    const { participantStreet, participantCity, participantState, participantZip } = appState;

    // If we have a full address, try the Census geocoder for precise coordinates
    if (participantStreet && participantCity && participantState) {
        try {
            const address = encodeURIComponent(`${participantStreet}, ${participantCity}, ${participantState} ${participantZip || ''}`);
            const url = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=Public_AR_Current&format=json`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.result?.addressMatches?.length > 0) {
                const match = data.result.addressMatches[0];
                console.log('Geocoded participant address:', match.matchedAddress);
                return {
                    lat: match.coordinates.y,
                    lng: match.coordinates.x
                };
            }
        } catch (error) {
            console.warn('Census geocoding failed, falling back to zip lookup:', error);
        }
    }

    // Fall back to zip code lookup
    if (participantZip) {
        const zipCoords = getZipCoords(participantZip);
        if (zipCoords) {
            console.log('Using zip code coordinates for participant');
            return zipCoords;
        }
    }

    // Fall back to city lookup
    if (participantCity) {
        const cityCoords = getCityCoords(participantCity);
        if (cityCoords) {
            console.log('Using city coordinates for participant');
            return cityCoords;
        }
    }

    return null;
}
