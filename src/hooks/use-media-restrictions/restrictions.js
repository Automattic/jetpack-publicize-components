/**
 * These restrictions were updated on: November 18, 2022.
 *
 * Image and video size is in MB.
 * Video length is in seconds.
 */
const MP4 = 'video/mp4';
const MOV = 'video/mov';
const VIDEOPRESS = 'video/videopress';
const allowedImageTypes = [ 'image/jpeg', 'image/jpg', 'image/png' ];
const facebookImageTypes = allowedImageTypes.concat( [
	'image/gif',
	'image/tiff',
	'image/tif',
	'image/bmp',
] );
const facebookVideoTypes = [
	'video/3g2',
	'video/3gp',
	'video/3gpp',
	'video/asf',
	'video/avi',
	'video/dat',
	'video/divx',
	'video/dv',
	'video/f4v',
	'video/flv',
	'video/gif',
	'video/m2ts',
	'video/m4v',
	'video/mkv',
	'video/mod',
	'video/mov',
	'video/mp4',
	'video/mpe',
	'video/mpeg',
	'video/mpeg4',
	'video/mpg',
	'video/mts',
	'video/nsv',
	'video/ogm',
	'video/ogv',
	'video/qt',
	'video/tod',
	'video/ts',
	'video/vob',
	'video/wmv',
];

export const RESTRICTIONS = {
	twitter: {
		allowedMediaTypes: allowedImageTypes.concat( [ MP4, VIDEOPRESS ] ),
		image: {
			maxSize: 5,
		},
		video: {
			maxSize: 512,
			maxLength: 140,
		},
	},
	facebook: {
		allowedMediaTypes: facebookImageTypes.concat( [ VIDEOPRESS, ...facebookVideoTypes ] ),
		image: {
			maxSize: 4,
		},
		video: {
			maxSize: 10000,
			maxLength: 14400,
		},
	},
	tumblr: {
		allowedMediaTypes: allowedImageTypes.concat( [ MP4, MOV, VIDEOPRESS ] ),
		image: {
			maxSize: 20,
		},
		video: {
			maxSize: 500,
			maxLength: 600,
		},
	},
	linkedin: {
		allowedMediaTypes: allowedImageTypes.concat( [ MP4, VIDEOPRESS ] ),
		image: {
			maxSize: 20,
		},
		video: {
			minSize: 0.075,
			maxSize: 200,
			maxLength: 600,
			minLength: 3,
		},
	},
};