import OfflinePlugin from 'offline-plugin/runtime';

OfflinePlugin.install({
  onInstalled: function() {
  },

  onUpdating: function() {
  },

  onUpdateReady: function() {
    OfflinePlugin.applyUpdate();
  },
  onUpdated: function() {
    window.location.reload();
  }
});

require('./comentarios');