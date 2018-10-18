/**
 * BLOCK: blog
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import apiFetch from '@wordpress/api-fetch';

( function( editor, components, i18n, element ) {
	var el = element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var RichText = wp.editor.RichText;
	var InspectorControls = wp.editor.InspectorControls;
	var TextControl = wp.components.TextControl;
	const { Component } = wp.element;

	var posts_html = [];

	const icon = el('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
		el('path', { d: "M 12 2 C 6.484375 2 2 6.484375 2 12 C 2 17.515625 6.484375 22 12 22 C 17.515625 22 22 17.511719 22 12 C 22 6.484375 17.515625 2 12 2 Z M 12 3 C 16.960938 3 21 7.035156 21 12 C 21 16.964844 16.960938 21 12 21 C 7.039063 21 3 16.960938 3 12 C 3 7.035156 7.039063 3 12 3 Z M 12 4 C 9.203125 4 6.742188 5.421875 5.3125 7.59375 C 5.5 7.601563 5.695313 7.625 5.84375 7.625 C 6.679688 7.625 7.96875 7.5 7.96875 7.5 C 8.398438 7.476563 8.429688 8.136719 8 8.1875 C 8 8.1875 7.574219 8.222656 7.09375 8.25 L 9.75 16.1875 L 11.5 10.9375 L 10.53125 8.25 C 10.101563 8.226563 9.6875 8.1875 9.6875 8.1875 C 9.253906 8.160156 9.289063 7.472656 9.71875 7.5 C 9.71875 7.5 11.058594 7.625 11.84375 7.625 C 12.679688 7.625 13.96875 7.5 13.96875 7.5 C 14.402344 7.476563 14.460938 8.136719 14.03125 8.1875 C 14.03125 8.1875 13.574219 8.222656 13.09375 8.25 L 16 16.25 L 16.8125 13.59375 C 17.074219 12.527344 17.40625 11.6875 17.40625 11 C 17.40625 10.25 17.0625 9.902344 16.75 9.375 C 16.355469 8.710938 15.96875 8.160156 15.96875 7.5 C 15.96875 6.765625 16.527344 6.09375 17.3125 6.09375 C 17.347656 6.09375 17.371094 6.089844 17.40625 6.09375 C 15.980469 4.789063 14.082031 4 12 4 Z M 19.03125 8.15625 C 19.066406 8.410156 19.046875 8.671875 19.0625 8.96875 C 19.101563 9.78125 18.941406 11.03125 18.75 11.625 C 18.140625 13.511719 16.34375 18.6875 16.34375 18.6875 C 16.375 18.675781 16.433594 18.652344 16.5625 18.5625 C 18.652344 17.132813 20 14.722656 20 12 C 20 10.609375 19.65625 9.296875 19.03125 8.15625 Z M 4.6875 8.75 C 4.246094 9.742188 4 10.839844 4 12 C 4 15.164063 5.832031 17.890625 8.5 19.1875 Z M 12.15625 12.6875 L 9.75 19.6875 C 10.46875 19.898438 11.214844 20 12 20 C 12.929688 20 13.824219 19.855469 14.65625 19.5625 C 14.636719 19.527344 14.609375 19.476563 14.59375 19.4375 Z " } )
	);

	registerBlockType( 'absolutte-blocks/blog', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Blog Section' ), // The title of our block.
		description: i18n.__( 'Displays blog posts.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				items: {
					type: 'string'
				}
			},
			posts: {
				type: 'array',
			},
			idAttr: {
				type: 'string',
			},
		},

		edit: class extends Component {
			constructor(props) {
				super(...arguments);
				this.props = props;
			}
			componentDidMount(){
				apiFetch( { path: absolutte_blocks.rest_api_url + 'wp/v2/posts/?_embed' } ).then( posts => {
					this.props.setAttributes( {
						posts: posts
					})
				} );
			}
			render() {
				var props = this.props;
				var attributes = props.attributes;

				var main_image, main_post_class, main_date = '';
				var date_options = { year: 'numeric', month: 'long', day: 'numeric' };
				if ( Array.isArray( attributes.posts ) && attributes.posts.length > 0 ){
					main_date = new Date(attributes.posts[0].date + 'Z');
					if( attributes.posts[0]._embedded['wp:featuredmedia'] ) {
						main_image = attributes.posts[0]._embedded['wp:featuredmedia']['0'].source_url;
						main_post_class = 'has-image';
					}else{
						main_post_class = 'not-has-image';
					}
				}

				return [
					el( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
					el( components.PanelBody, {
						title: i18n.__( 'ID Attribute' ),
						className: 'id-attribute',
						initialOpen: false,
					},
						el( TextControl, {
							type: 'string',
							label: i18n.__( 'ID Attribute' ),
							value: attributes.idAttr,
							onChange: function( newID ) {
								props.setAttributes( { idAttr: newID } );
							},
						} ),
					),
				),
					el( 'div', { className: props.className + ' absolutte-section-blog absolutte-section', id: attributes.idAttr },
						el( 'div', { className: 'container' },
							el( 'div', { className: 'row' },
								el( 'div', { className: 'col-12' },
									el( RichText, {
											tagName: 'h3',
											className: 'absolutte-blog-title absolutte-section-title-small',
											placeholder: i18n.__( 'Title' ),
											keepPlaceholderOnFocus: true,
											value: attributes.title,
											isSelected: false,
											onChange: function( newTitle ) {
												props.setAttributes( { title: newTitle } );
											},
										} 
									),
								),
							),
							( attributes.posts ) ?
							el( 'div', { className: 'row' },
								el( 'div', { className: 'col-12 col-sm-6' },
									el( 'div', { className: 'absolutte-blog-post absolutte-blog-post-big absolutte-track ' + main_post_class },
										el( 'div', { className: 'absolutte-blog-post-image', style: { backgroundImage: `url('${ main_image }')` }
										},
											el( 'a', { href: attributes.posts[0].link } ),
										),
										el( 'div', { className: 'absolutte-blog-post-content' },
											el( 'h4', { className: 'absolutte-blog-post-title' },
												el( 'a', { href: attributes.posts[0].link }, attributes.posts[0].title.rendered ),
											),
											el( 'div', { className: 'absolutte-blog-post-date' },
												el( 'a', { href: attributes.posts[0].link }, main_date.toLocaleDateString("en-US", date_options ) ),
											),
										),
									),
								),
								( attributes.posts.length > 0 ) ?
									el( 'div', { className: 'col-12 col-sm-6' },
										
										attributes.posts.forEach(function( post, index, theArray ){
											if ( index == 0 ) {
												posts_html = [];
											}
											if ( index == 0 || index > 3 ) {
												return false;
											}
											
											var second_image, second_post_class = '';
											var second_date = new Date(post.date + 'Z');
											if( post._embedded['wp:featuredmedia'] ) {
												second_image = post._embedded['wp:featuredmedia']['0'].source_url;
												second_post_class = 'has-image';
											}else{
												second_post_class = 'not-has-image';
											}
											posts_html.push( 
												el( 'div', { className: 'absolutte-blog-post absolutte-track ' + second_post_class },
													el( 'div', { className: 'absolutte-blog-post-image', style: { backgroundImage: `url(' ${ second_image }')` }  },
														el( 'a', { href: post.link } ),
													),
													el( 'div', { className: 'absolutte-blog-post-content' },
														el( 'h4', { className: 'absolutte-blog-post-title' },
															el( 'a', { href: post.link }, post.title.rendered ),
														),
														el( 'div', { className: 'absolutte-blog-post-date' },
															el( 'a', { href: post.link }, second_date.toLocaleDateString("en-US", date_options ) ),
														),
													),
												)
											)
											
										}),
										posts_html
									)
								: null

							)
							: null
						)
					),
				];
			}
		},
		

		save: function( props ) {
			return null;
		},
	} );

} )(
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);