Ext.override(Rally.ui.gridboard.SharedViewComboBox, {
    /**
     * This override fixes a bug in the SharedViewComboBox which prevents a newly created
     * view from appearing in the view picker until after an app reload
     */
    _isViewPreference: function (record) {
        return record.self.typePath === 'preference' &&
            record.get('Type') === 'View' &&
            // This is fix. Must use '==' not '===' for this to return true
            record.get('AppId') == this.getContext().getAppId();
    },

    /**
     * This override allows the `enableUrlSharing` option to work.
     * Must override `window.location` with `parent.location`.
     */
    getSharedViewParam: function () {
        var hash = parent.location.hash,
            matches = hash.match(/sharedViewId=(\d+)/);

        return matches && matches[1];
    },

    /**
     * Override to avoid a race condition when restoring columns when using
     * `enableUrlSharing`
     * _ensureLatestView is called out of the constructor after initComponent before store.load(), but store.load() is called immediately after
     * by the parent combobox. The asynchronous store.model.load() here will race with store.load() invoked by the parent. If
     * the store.load returns first, this function would miss the load event and never apply the latest view columns.
     * 
     * Ensure we don't miss the store.load() event by registering an event handler now (before the parent calls store.load()) and
     * that handler can act on the store.model.load() promise when it resolves. This allows both loads to proceed in parallel without
     * possibly missing the load event.
     */
    _ensureLatestView: function (state) {
        if (state.objectId && state.versionId) {
            var modelLoadDeferred = Ext.create('Deft.Deferred');
            this.store.model.load(state.objectId, {
                fetch: true,
                success: function (record) {
                    modelLoadDeferred.resolve(record);
                }
            });
            this.store.on('load', function () {
                modelLoadDeferred.promise.then({
                    success: function (record) {
                        if (record && record.get('VersionId') !== state.versionId && record.raw.AppId == Rally.getApp().getAppId()) {
                            this._applyView(this._decodeValue(record));
                        }
                    },
                    scope: this
                })
            }, this, { single: true });
        }
    },

    /**
     *  Need to first make sure that the view grabbed from the URL is intended for this app
    * */
    _insertViewIntoStore: function () {
        this.store.model.load(this.sharedViewId, {
            fetch: true,
            success: function (record) {
                if (record && record.raw.AppId == Rally.getApp().getAppId()) {
                    this.callParent(arguments);
                }
            }
        });

    }
});
