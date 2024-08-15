import * as connectionDataSelectors from './connection-data';
import jetpackSettingSelectors from './jetpack-settings';
import * as sharesData from './shares-data';
import siteDataSelectors from './site-data';
import socialImageGeneratorSettingsSelectors from './social-image-generator-settings';

const selectors = {
	...siteDataSelectors,
	...connectionDataSelectors,
	...jetpackSettingSelectors,
	...sharesData,
	...socialImageGeneratorSettingsSelectors,
	useAdminUiV1: state => state.useAdminUiV1,
	featureFlags: state => state.featureFlags,
	hasPaidFeatures: state => state.hasPaidFeatures,
	connectionRefreshPath: state => state.connectionRefreshPath,
};

export default selectors;
