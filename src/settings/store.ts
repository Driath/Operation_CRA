import { inject, InjectionToken } from '@angular/core';
import { Settings } from './settings';
import { signalStore, withState } from '@ngrx/signals';

const key = 'SettingsState';

type SettingsState = Settings;

const initialState: SettingsState = {
    i18n: 'FR-fr',
};

const settingsStateToken = new InjectionToken<SettingsState>(key, {
    factory: () => initialState,
});

export const SettingsStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(settingsStateToken)),
);
