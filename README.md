# Links
Easily check a list of links

## Install
1. Download and Move `Links` folder to a permanent location

2. Open `Terminal` and `cd` to `Links`

3. Execute `chmod +x ./install.sh && ./install.sh` (See Note 1)

4. Move `Links.app` anywhere you want

5. Run `Links.app` by double clicking it

## Features
1. Displays a list of links with names

2. You can click on the `name` to open the link in a new tab

3. You can click the `checkmark` next to a name to tell the app that you have checked the link and want to remove it from the list

4. You can click on the `+` button on the bottom right corner to add new links to the list

5. On the add page, you can either click on the `cancel` button if you do not want to add anything or click on the `add` button if you want to add the links to the list

6. Only unique names are allowed meaning that multiple links can NOT have the same name

7. When adding new links to the list, any duplicates will NOT be added and any existing links will NOT be overwritten (See Note 2)

## Note
1. The shell scripts are for Unix/Linux based Operating Systems such as MacOS

2. You can change the data manually in the `Links/backend/data/data.json` file

