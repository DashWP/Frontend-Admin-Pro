<?php
namespace Frontend_Admin\Classes;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}


class PermissionsTab {


	public function conditions_logic( $settings, $type = 'form' ) {
		if ( ! empty( $settings['display'] ) ) {
			return $settings;
		}

		if( 'field' == $type ){
			$type = 'form';
			$parent = $settings['parent'] ?? 0;
			if( $parent ){
				$settings = fea_instance()->form_display->get_form( $parent );
			}else{
				global $fea_form;
				if( $fea_form ){
					$settings = $fea_form;
				}
			}
		}

		global $post;

		if ( isset( $settings['form_conditions'] ) ) {
			$conditions = $settings['form_conditions'];
		} else {
			$conditions = array();
			$values     = array(
				'who_can_see'         => 'logged_in',
				'not_allowed'         => 'show_nothing',
				'not_allowed_message' => '',
				'not_allowed_content' => '',
				'email_verification'  => 'all',
				'by_role'             => array( 'administrator' ),
				'by_user_id'          => '',
				'dynamic'             => '',
				'wp_uploader'		  => 'true',
			);

			foreach ( $values as $key => $value ) {
				if ( isset( $settings[ $key ] ) ) {
					$conditions[0][ $key ] = $settings[ $key ];
				} else {
					$conditions[0][ $key ] = $value;
				}
			}
		}

		if ( empty( $conditions ) ) {
			return $settings;
		}
		$active_user = wp_get_current_user();
		foreach ( $conditions as $condition ) {
			if( empty( $condition['wp_uploader'] ) ){
				$settings['uploader'] = 'basic';
			}else{
				$settings['uploader'] = 'wp';
			}

			if ( ! isset( $condition['applies_to'] ) ) {
				$condition['applies_to'] = array( 'form' );
			}

			if ( empty( $condition['applies_to'] ) || ! in_array( $type, $condition['applies_to'] ) ) {
				continue;
			}

			if ( 'all' == $condition['who_can_see'] ) {
				$settings['display'] = true;

				return $settings;
			}
			if ( 'logged_out' == $condition['who_can_see'] ) {
				$settings['display'] = ! (bool) $active_user->ID;
			}
			if ( 'logged_in' == $condition['who_can_see'] ) {
				if ( ! $active_user ) {
					$settings['display'] = false;
				} else {
					$by_role    = $by_cap = $specific_user = $dynamic = false;
					$user_roles = $condition['by_role'];

					if ( $user_roles ) {
						if ( is_array( $condition['by_role'] ) ) {
							if ( count( array_intersect( $condition['by_role'], (array) $active_user->roles ) ) != false || in_array( 'all', $condition['by_role'] ) ) {
								$by_role = true;
							}
						}
					}

					if ( ! empty( $condition['by_cap'] ) ) {
						foreach ( $condition['by_cap'] as $cap ) {
							if ( current_user_can( $cap ) ) {
								$by_cap = true;
							}
						}
					}

					if ( ! empty( $condition['by_user_id'] ) ) {
						$user_ids = $condition['by_user_id'];
						if ( ! is_array( $user_ids ) ) {
							$user_ids = explode( ',', $user_ids );
						}
						if ( is_array( $user_ids ) ) {
							if ( in_array( $active_user->ID, $user_ids ) ) {
								$specific_user = true;
							}
						}
					}

					$save = isset( $settings['save_to_post'] ) ? $settings['save_to_post'] : '';
					if ( $save == 'edit_post' || $save == 'delete_post' || $save == 'duplicate_post' ) {
						$post_action = true;
					}

					if ( ! empty( $condition['dynamic'] ) ) {
						if ( ! empty( $settings['post_id'] ) ) {
							$post_id = $settings['post_id'];
						} elseif ( ! empty( $settings['product_id'] ) ) {
							$post_id = $settings['product_id'];
						} else {
							$post_id = get_the_ID();
							if ( isset( $post_action ) ) {
								if ( $settings['post_to_edit'] == 'select_post' && ! empty( $settings['post_select'] ) ) {
									$post_id = $settings['post_select'];
								} elseif ( $settings['post_to_edit'] == 'url_query' && isset( $_GET[ $settings['url_query_post'] ] ) ) {
									$post_id = absint( $_GET[ $settings['url_query_post'] ] );
								}
							}
						}

						if ( '[author]' == $condition['dynamic'] ) {
							$author_id = get_post_field( 'post_author', $post_id );
						} else {
							$author_id = get_post_meta( $post_id, $condition['dynamic'], true );
						}

						if ( ! is_numeric( $author_id ) ) {
							$authors = feadmin_decode_choices( $author_id );
							if ( in_array( $active_user->ID, $authors ) ) {
								$dynamic = true;
							}
						} else {
							
							if ( $author_id == $active_user->ID ) {
								$dynamic = true;
							}
						}
					}
					$save = isset( $settings['save_to_user'] ) ? $settings['save_to_user'] : '';
					if ( $save == 'edit_user' || $save == 'delete_user' ) {
						$user_action = true;
					}
					if ( isset( $condition['dynamic_manager'] ) && isset( $user_action ) ) {
						if ( $settings['user_to_edit'] == 'current_user' ) {
							$user_id = $active_user->ID;
						} elseif ( $settings['user_to_edit'] == 'select_user' ) {
							$user_id = $settings['user_select'];
						} elseif ( $settings['user_to_edit'] == 'url_query' && isset( $_GET[ $settings['url_query_user'] ] ) ) {
							$user_id = wp_kses( $_GET[ $settings['url_query_user'] ], 'strip' );
						}

						if ( $condition['dynamic_manager'] && isset( $user_id[1] ) ) {
							$manager_id = false;

							if ( 'manager' == $condition['dynamic_manager'] ) {
								$manager_id = get_user_meta( $user_id, 'frontend_admin_manager', true );
							} else {
								$manager_id = get_user_meta( $user_id, $condition['dynamic_manager'], true );
							}

							if ( $manager_id == $active_user->ID ) {
								$dynamic = true;
							}
						}
					}

					if ( $by_role || $by_cap || $specific_user || $dynamic ) {
						if ( isset( $condition['email_verification'] ) && $condition['email_verification'] != 'all' ) {
							$required       = $condition['email_verification'] == 'verified' ? 1 : 0;
							$email_verified = get_user_meta( $active_user, 'frontend_admin_email_verified', true );

							if ( ( $email_verified == $required ) ) {
								$settings['display'] = true;
							} else {
								$settings['display'] = false;
							}
						} else {
							$settings['display'] = true;
						}
						if ( ! empty( $condition['allowed_submits'] ) ) {
							$submits = (int) $condition['allowed_submits'];
							$submitted = get_user_meta( $active_user->ID, 'submitted::' . $settings['id'], true );

							if ( $submits - (int) $submitted <= 0 ) {
								$settings['display'] = false;
								if ( $condition['limit_reached'] == 'show_message' ) {
									echo '<div class="acf-notice -limit frontend-admin-limit-message"><p>' . $condition['limit_reached_message'] . '</p></div>';
								} elseif ( $condition['limit_reached'] == 'custom_content' ) {
									echo wp_kses_post( $condition['limit_reached_content'] );
								} 
							}
						}
						return $settings;
					}

					$settings['display'] = false;

				}
			}
			if ( $condition['not_allowed'] == 'show_message' ) {
				echo '<div class="acf-notice -limit frontend-admin-limit-message"><p>' . esc_html( $condition['not_allowed_message'] ) . '</p></div>';
			} elseif ( $condition['not_allowed'] == 'custom_content' ) {
				echo wp_kses_post( $condition['not_allowed_content'] );
			}

			if ( $settings['display'] ) {
				break;
			}
		}
		if ( empty( $settings['display'] ) ) {
			$settings = false;
		}

		return $settings;
	}

	public function __construct() {
		add_filter( 'frontend_admin/show_form', array( $this, 'conditions_logic' ), 10, 2 );
	}

}

new PermissionsTab();
