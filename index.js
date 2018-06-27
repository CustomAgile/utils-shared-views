/**
 * This override fixes a bug in the SharedViewComboBox which prevents a newly created
 * view from appearing in the view picker until after an app reload
 */
Ext.override(Rally.ui.gridboard.SharedViewComboBox, {
    _isViewPreference: function(record) {
        return record.self.typePath === 'preference' &&
            record.get('Type') === 'View' &&
            // This is fix. Must use '==' not '===' for this to return true
            record.get('AppId') == this.getContext().getAppId();
    }
})
