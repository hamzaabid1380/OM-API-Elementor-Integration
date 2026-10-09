<?php
/**
 * Visit: showroom photo, map, address and live opening hours, and the booking form
 * (emailed to the shop and passed to your CRM), plus "what happens after you book".
 *
 * @package WulfKit
 */

defined( 'ABSPATH' ) || exit;

use Elementor\Controls_Manager;
use Elementor\Repeater;

class WK_Visit_Widget extends WK_Widget {

	protected $key = 'visit';

	public function get_title() {
		return __( 'Wulf · Visit & book', 'wulf-kit' );
	}

	public function get_icon() {
		return 'eicon-map-pin';
	}

	protected function register_controls() {
		$m = WK_URL . 'assets/media/';
		$this->section_controls( array( 'anchor' => 'visit', 'tone' => 'ivory' ) );
		$this->head_controls( array( 'eyebrow' => __( 'Visit us', 'wulf-kit' ), 'title' => __( 'Our Crown Point showroom.', 'wulf-kit' ), 'lead' => __( 'Walk-ins welcome. Book ahead and we\'ll have a private table, and your pieces, ready.', 'wulf-kit' ) ) );

		$this->start_controls_section( 'c_place', array( 'label' => __( 'Showroom', 'wulf-kit' ) ) );
		$this->add_control( 'photo', array( 'label' => __( 'Photo', 'wulf-kit' ), 'type' => Controls_Manager::MEDIA, 'default' => array( 'url' => $m . 'showroom.webp' ) ) );
		$this->add_control( 'map', array(
			'label'   => __( 'Map', 'wulf-kit' ),
			'type'    => Controls_Manager::SELECT,
			'default' => 'drawn',
			'options' => array( 'drawn' => __( 'Simple drawn map (links to Google Maps)', 'wulf-kit' ), 'google' => __( 'Live Google map', 'wulf-kit' ), 'none' => __( 'No map', 'wulf-kit' ) ),
		) );
		$this->add_control( 'map_street', array( 'label' => __( 'Street name on the drawn map', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'BROADWAY', 'condition' => array( 'map' => 'drawn' ) ) );
		$this->add_control( 'map_tag', array( 'label' => __( 'Map label', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Open in Google Maps', 'wulf-kit' ), 'condition' => array( 'map' => 'drawn' ) ) );
		$this->add_control( 'note_addr', array( 'type' => Controls_Manager::RAW_HTML, 'raw' => __( 'Address, phone and hours come from Wulf Kit › Settings.', 'wulf-kit' ), 'content_classes' => 'elementor-descriptor' ) );
		$this->add_control( 'dir_text', array( 'label' => __( 'Directions button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Get directions', 'wulf-kit' ) ) );
		$this->add_control( 'call_text', array( 'label' => __( 'Call button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Call us', 'wulf-kit' ) ) );
		$this->add_control( 'daybar', array( 'label' => __( 'Day progress bar', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_form', array( 'label' => __( 'Booking form', 'wulf-kit' ) ) );
		$this->add_control( 'form_on', array( 'label' => __( 'Show the form', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes', 'return_value' => 'yes' ) );
		$this->add_control( 'f_short', array( 'label' => __( 'Short form', 'wulf-kit' ), 'type' => Controls_Manager::SWITCHER, 'default' => '', 'return_value' => 'yes', 'description' => __( 'Only name, mobile, topics, day and time. Hides email, "best way to reach you" and the notes box.', 'wulf-kit' ), 'condition' => array( 'form_on' => 'yes' ) ) );
		$this->add_control( 'f_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Book your free consultation', 'wulf-kit' ) ) );
		$this->add_control( 'f_sub', array( 'label' => __( 'Under the title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Free, no obligation. We\'ll confirm by call or text.', 'wulf-kit' ), 'label_block' => true ) );
		$r = new Repeater();
		$r->add_control( 'topic', array( 'label' => __( 'Topic', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'bring', array( 'label' => __( 'What to bring (shown after booking)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$this->add_control( 'topics', array(
			'label'       => __( 'Topics to choose from', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ topic }}}',
			'default'     => array(
				array( 'topic' => 'Engagement ring', 'bring' => 'Any inspiration photos you love' ),
				array( 'topic' => 'Wedding bands', 'bring' => 'Your engagement ring, so we can match it' ),
				array( 'topic' => 'Custom design', 'bring' => 'Sketches, photos or a family stone' ),
				array( 'topic' => 'Repair', 'bring' => 'The piece that needs work' ),
				array( 'topic' => 'Appraisal', 'bring' => 'The piece and any grading reports' ),
				array( 'topic' => 'Selling', 'bring' => 'The pieces you want to sell and a photo ID' ),
				array( 'topic' => 'Financing', 'bring' => 'A photo ID' ),
			),
		) );
		$this->add_control( 'times', array( 'label' => __( 'Time choices (comma separated)', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => 'Morning, Midday, Afternoon' ) );
		$this->add_control( 'f_btn', array( 'label' => __( 'Send button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'Request my visit', 'wulf-kit' ) ) );
		$this->add_control( 'f_done', array( 'label' => __( 'Thank-you message', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 3, 'default' => __( 'We\'ll confirm your visit on {day} ({time}) by {pref} within one business day.', 'wulf-kit' ), 'description' => __( '{name}, {day}, {time} and {pref} are filled in.', 'wulf-kit' ) ) );
		$this->add_control( 'f_fine', array( 'label' => __( 'Small print under the button', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '', 'label_block' => true ) );
		$this->end_controls_section();

		$this->start_controls_section( 'c_after', array( 'label' => __( 'After you book', 'wulf-kit' ) ) );
		$this->add_control( 'after_title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => __( 'What happens after you book', 'wulf-kit' ), 'description' => __( 'Empty hides this row.', 'wulf-kit' ) ) );
		$r = new Repeater();
		$r->add_control( 'title', array( 'label' => __( 'Title', 'wulf-kit' ), 'type' => Controls_Manager::TEXT, 'default' => '' ) );
		$r->add_control( 'text', array( 'label' => __( 'Text', 'wulf-kit' ), 'type' => Controls_Manager::TEXTAREA, 'rows' => 2, 'default' => '' ) );
		$this->add_control( 'after', array(
			'label'       => __( 'Steps', 'wulf-kit' ),
			'type'        => Controls_Manager::REPEATER,
			'fields'      => $r->get_controls(),
			'title_field' => '{{{ title }}}',
			'default'     => array(
				array( 'title' => 'Consult', 'text' => 'A relaxed, free conversation about style, timing and budget.' ),
				array( 'title' => 'Compare', 'text' => 'Diamonds side by side under the loupe, grading reports in hand.' ),
				array( 'title' => 'Craft', 'text' => 'We set your stone, or design one from scratch with you.' ),
				array( 'title' => 'Celebrate', 'text' => 'Pick it up, propose, and come back for free cleaning any time.' ),
			),
		) );
		$this->end_controls_section();

		$this->style_section();
		$this->style_head();
		$this->box_style( 'box', __( 'Boxes', 'wulf-kit' ), '.visit .box', false );
		$this->text_style( 'addr', __( 'Address & phone', 'wulf-kit' ), '.contact a', true, true, array(
			'ic' => array( 'label' => __( 'Icon color', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .contact svg' => 'color: {{VALUE}};' ) ),
		) );
		$this->start_controls_section( 's_hours', array( 'label' => __( 'Hours', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'st_open_bg', __( 'Open badge background', 'wulf-kit' ), '.status', 'background-color' );
		$this->color( 'st_open_c', __( 'Open badge text', 'wulf-kit' ), '.status' );
		$this->color( 'st_closed_bg', __( 'Closed badge background', 'wulf-kit' ), '.status.closed', 'background-color' );
		$this->color( 'st_closed_c', __( 'Closed badge text', 'wulf-kit' ), '.status.closed' );
		$this->color( 'db_track', __( 'Day bar track', 'wulf-kit' ), '.db-track', 'background-color' );
		$this->color( 'db_fill', __( 'Day bar fill', 'wulf-kit' ), '.db-fill', 'background' );
		$this->color( 'h_today', __( 'Today row', 'wulf-kit' ), '.hours li.today' );
		$this->color( 'h_rows', __( 'Other rows', 'wulf-kit' ), '.hours li' );
		$this->color( 'h_line', __( 'Row lines', 'wulf-kit' ), '.hours li', 'border-bottom-color' );
		$this->end_controls_section();
		$this->button_style( 'dir', __( 'Directions button', 'wulf-kit' ), '.visit-btns .btn-ink' );
		$this->button_style( 'call', __( 'Call button', 'wulf-kit' ), '.visit-btns .btn-line' );
		$this->start_controls_section( 's_form', array( 'label' => __( 'Form fields & chips', 'wulf-kit' ), 'tab' => Controls_Manager::TAB_STYLE ) );
		$this->color( 'in_bg', __( 'Field background', 'wulf-kit' ), '.book input, {{WRAPPER}} .wk .book select, {{WRAPPER}} .wk .book textarea', 'background-color' );
		$this->color( 'in_bd', __( 'Field border', 'wulf-kit' ), '.book input, {{WRAPPER}} .wk .book select, {{WRAPPER}} .wk .book textarea', 'border-color' );
		$this->color( 'in_focus', __( 'Field border when typing', 'wulf-kit' ), '.book input:focus, {{WRAPPER}} .wk .book select:focus, {{WRAPPER}} .wk .book textarea:focus', 'border-color' );
		$this->color( 'lbl', __( 'Labels', 'wulf-kit' ), '.book label, {{WRAPPER}} .wk .book .lbl' );
		$this->color( 'chip_c', __( 'Chip text', 'wulf-kit' ), '.book .opt' );
		$this->color( 'chip_b', __( 'Chip border', 'wulf-kit' ), '.book .opt', 'border-color' );
		$this->color( 'chip_on_bg', __( 'Chosen chip background', 'wulf-kit' ), '.book .opt[aria-pressed="true"], {{WRAPPER}} .wk .book .opt[aria-checked="true"]', 'background-color' );
		$this->color( 'chip_on_c', __( 'Chosen chip text', 'wulf-kit' ), '.book .opt[aria-pressed="true"], {{WRAPPER}} .wk .book .opt[aria-checked="true"]' );
		$this->end_controls_section();
		$this->button_style( 'send', __( 'Send button', 'wulf-kit' ), '.book [type=submit]' );
		$this->text_style( 'after', __( 'After-you-book row', 'wulf-kit' ), '.after p', false, true, array(
			'tc' => array( 'label' => __( 'Titles', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .after b' => 'color: {{VALUE}};' ) ),
			'nc' => array( 'label' => __( 'Number circles', 'wulf-kit' ), 'type' => Controls_Manager::COLOR, 'selectors' => array( '{{WRAPPER}} .wk .after b span' => 'color: {{VALUE}};' ) ),
		) );
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$set   = WK_Settings::all();
		$tel   = WK_Settings::tel();
		$maps  = $set['maps_url'];
		$uid   = 'wk-v-' . $this->get_id();
		$bring = array();
		foreach ( (array) $s['topics'] as $t ) {
			if ( '' !== trim( (string) $t['topic'] ) ) {
				$bring[ $t['topic'] ] = $t['bring'];
			}
		}
		$this->open( $s, '', array( 'bring' => $bring, 'done' => $s['f_done'] ) );
		echo '<section class="' . esc_attr( $this->sec_class( $s ) ) . '"' . $this->anchor_attr( $s ) . '><div class="wrap">'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$this->head( $s );
		echo '<div class="visit' . ( 'yes' === $s['form_on'] ? '' : ' no-form' ) . '"><div class="box">';
		$photo = $this->img_url( $s['photo'] );
		if ( $photo || 'none' !== $s['map'] ) {
			echo '<div class="visit-media' . ( $photo && 'none' !== $s['map'] ? '' : ' one' ) . '">';
			if ( $photo ) {
				echo '<div class="slot ph"><img src="' . esc_url( $photo ) . '" alt="' . esc_attr__( 'Inside the showroom', 'wulf-kit' ) . '" loading="lazy" decoding="async"></div>';
			}
			if ( 'google' === $s['map'] ) {
				echo '<div class="map"><iframe title="' . esc_attr__( 'Map', 'wulf-kit' ) . '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' . esc_url( 'https://www.google.com/maps?q=' . rawurlencode( $set['name'] . ' ' . $set['address'] ) . '&output=embed' ) . '"></iframe></div>';
			} elseif ( 'drawn' === $s['map'] ) {
				echo '<a class="map" href="' . esc_url( $maps ) . '" target="_blank" rel="noopener" aria-label="' . esc_attr__( 'Open directions in Google Maps', 'wulf-kit' ) . '"><span class="map-tag" aria-hidden="true">' . WK_Icons::svg( 'dir' ) . esc_html( $s['map_tag'] ) . '</span>' . self::drawn_map( $s['map_street'] ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</div>';
		}
		echo '<div class="visit-info"><div><div class="contact">';
		echo '<a href="' . esc_url( $maps ) . '" target="_blank" rel="noopener">' . WK_Icons::svg( 'pin' ) . '<span>' . esc_html( $set['address'] ) . ( $set['address_note'] ? '<small>' . esc_html( $set['address_note'] ) . '</small>' : '' ) . '</span></a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( $set['phone'] ) {
			echo '<a href="' . esc_attr( $tel ) . '">' . WK_Icons::svg( 'phone' ) . esc_html( $set['phone'] ) . '</a>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		echo '</div><div class="visit-btns">';
		if ( $s['dir_text'] ) {
			echo '<a class="btn btn-ink btn-sm" href="' . esc_url( $maps ) . '" target="_blank" rel="noopener">' . esc_html( $s['dir_text'] ) . '</a>';
		}
		if ( $s['call_text'] && $set['phone'] ) {
			echo '<a class="btn btn-line btn-sm" href="' . esc_attr( $tel ) . '">' . esc_html( $s['call_text'] ) . '</a>';
		}
		echo '</div></div><div><span class="status" data-wk-status><i></i><span data-status-text></span></span>';
		if ( 'yes' === $s['daybar'] ) {
			echo '<div class="daybar" data-daybar aria-hidden="true"><div class="db-track"><span class="db-fill"></span><span class="db-now"></span></div><div class="db-lbl"><span data-db-open></span><span data-db-close></span></div></div>';
		}
		// Phones show today's row; the button opens the whole week.
		echo '<ul class="hours" data-hours id="' . esc_attr( 'wk-hours-' . $this->get_id() ) . '"></ul><button class="hours-more" type="button" aria-expanded="false" aria-controls="' . esc_attr( 'wk-hours-' . $this->get_id() ) . '" data-hours-more>' . esc_html__( 'See all hours', 'wulf-kit' ) . '</button></div></div></div>';

		if ( 'yes' === $s['form_on'] ) {
			$times = array_filter( array_map( 'trim', explode( ',', (string) $s['times'] ) ) );
			echo '<div class="box book" id="' . esc_attr( $uid ) . '-book"><h3 class="h3">' . esc_html( $s['f_title'] ) . '</h3>' . ( $s['f_sub'] ? '<p class="sub">' . esc_html( $s['f_sub'] ) . '</p>' : '' );
			echo '<form novalidate data-book-form><div style="display:grid;gap:18px">';
			echo '<div class="tray-card" data-tray-card hidden><b data-tray-title></b><div class="thumbs tray-thumbs" data-tray-thumbs></div><p>' . esc_html__( 'We\'ll bring these in for your visit, usually within a few business days.', 'wulf-kit' ) . '</p></div>';
			if ( $bring ) {
				echo '<div class="field"><span class="lbl" id="' . esc_attr( $uid ) . '-t">' . esc_html__( 'I\'d like to talk about', 'wulf-kit' ) . ' <span style="font-weight:500;color:var(--sub)">' . esc_html__( '(choose any)', 'wulf-kit' ) . '</span></span><div class="chips" role="group" aria-labelledby="' . esc_attr( $uid ) . '-t">';
				foreach ( array_keys( $bring ) as $t ) {
					echo '<button class="opt" type="button" aria-pressed="false" data-topic-opt="' . esc_attr( $t ) . '">' . esc_html( $t ) . '</button>';
				}
				echo '</div></div>';
			}
			echo '<div class="row2"><div class="field"><label for="' . esc_attr( $uid ) . '-name">' . esc_html__( 'Name', 'wulf-kit' ) . '</label><input id="' . esc_attr( $uid ) . '-name" name="name" autocomplete="name"><span class="err" hidden>' . esc_html__( 'Please add your name.', 'wulf-kit' ) . '</span></div>';
			echo '<div class="field"><label for="' . esc_attr( $uid ) . '-phone">' . esc_html__( 'Mobile', 'wulf-kit' ) . '</label><input id="' . esc_attr( $uid ) . '-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(219) 000-0000"><span class="err" hidden>' . esc_html__( 'Please add a 10-digit number.', 'wulf-kit' ) . '</span></div></div>';
			$short = 'yes' === ( $s['f_short'] ?? '' );
			if ( ! $short ) {
				echo '<div class="field"><label for="' . esc_attr( $uid ) . '-email">' . esc_html__( 'Email', 'wulf-kit' ) . ' <span>' . esc_html__( '(optional)', 'wulf-kit' ) . '</span></label><input id="' . esc_attr( $uid ) . '-email" name="email" type="email" autocomplete="email"></div>';
				echo '<div class="field"><span class="lbl" id="' . esc_attr( $uid ) . '-p">' . esc_html__( 'Best way to reach you', 'wulf-kit' ) . '</span><div class="chips" role="radiogroup" aria-labelledby="' . esc_attr( $uid ) . '-p" data-pref>';
				foreach ( array( __( 'Call', 'wulf-kit' ), __( 'Text', 'wulf-kit' ), __( 'Email', 'wulf-kit' ) ) as $i => $p ) {
					echo '<button class="opt" type="button" role="radio" aria-checked="' . ( 1 === $i ? 'true' : 'false' ) . '">' . esc_html( $p ) . '</button>';
				}
				echo '</div></div>';
			}
			echo '<div class="row2"><div class="field"><label for="' . esc_attr( $uid ) . '-day">' . esc_html__( 'Day', 'wulf-kit' ) . '</label><select id="' . esc_attr( $uid ) . '-day" name="day" data-days></select></div>';
			echo '<div class="field"><label for="' . esc_attr( $uid ) . '-time">' . esc_html__( 'Time', 'wulf-kit' ) . '</label><select id="' . esc_attr( $uid ) . '-time" name="time">';
			foreach ( $times as $t ) {
				echo '<option>' . esc_html( $t ) . '</option>';
			}
			echo '</select></div></div>';
			if ( ! $short ) {
				echo '<div class="field"><label for="' . esc_attr( $uid ) . '-note">' . esc_html__( 'Anything we should have ready?', 'wulf-kit' ) . ' <span>' . esc_html__( '(optional)', 'wulf-kit' ) . '</span></label><textarea id="' . esc_attr( $uid ) . '-note" name="note"></textarea></div>';
			}
			echo '<input type="text" name="website" tabindex="-1" autocomplete="off" class="sr" aria-hidden="true">';
			echo '<button class="btn btn-ink" type="submit">' . esc_html( $s['f_btn'] ) . ' ' . WK_Icons::svg( 'arr', 'arr' ) . '</button>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo '<p class="err" data-form-err hidden></p>';
			if ( $s['f_fine'] ) {
				echo '<p class="fine" style="text-align:center">' . esc_html( $s['f_fine'] ) . '</p>';
			}
			echo '</div></form><div class="done" data-done hidden tabindex="-1"></div></div>';
		}
		echo '</div>';
		if ( $s['after_title'] && $s['after'] ) {
			echo '<div class="after"><h3>' . esc_html( $s['after_title'] ) . '</h3><ol style="display:contents">';
			foreach ( array_values( (array) $s['after'] ) as $i => $a ) {
				echo '<li><b><span>' . (int) ( $i + 1 ) . '</span>' . esc_html( $a['title'] ) . '</b><p>' . esc_html( $a['text'] ) . '</p></li>';
			}
			echo '</ol></div>';
		}
		echo '</div></section>';
		$this->close();
	}

	private static function drawn_map( $street ) {
		return '<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="200" fill="#eef0f2"/><g stroke="#fff" stroke-width="10"><path d="M0 70H300M0 150H300M70 0V200M230 0V200"/></g><path d="M150 0V200" stroke="#fff" stroke-width="18"/><path d="M150 0V200" stroke="#e3e6ea" stroke-width="1"/><rect x="164" y="88" width="56" height="48" rx="4" fill="#e3e8e0"/><text transform="translate(156 192) rotate(-90)" font-family="Manrope, sans-serif" font-size="10" font-weight="700" letter-spacing="1.2" fill="#6b7480">' . esc_html( $street ) . '</text><path d="M150 112s-13-11-13-22a13 13 0 0 1 26 0c0 11-13 22-13 22Z" fill="#0f1217"/><circle cx="150" cy="90" r="4.8" fill="#d6b97f"/></svg>';
	}
}
