import { N8AOPostPass } from 'n8ao';

/**
 * The contact shadows for the WordPress film (best tier only), as a small
 * add-on the film script loads when it needs them. Built with three.js and
 * postprocessing pointing at the copies inside the film script (ao-lib.js).
 */
window.WulfFilmAO = N8AOPostPass;
