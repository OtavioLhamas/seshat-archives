export function localize (stringId, data={}) {
	return game.i18n.format(stringId, data);
};

export function formField (field, options) {
	return HandlebarsHelpers.formField(field, options);
}
