const { CLIENT } = require("./servers");

module.exports ={
    url: `${CLIENT.URL}/teams`,
    addTeamURL: `${CLIENT.URL}/teams/add`,
    teamsContainer: 'div[data-testid=\'courses\']',
    submitBtn: 'a[data-testid=\'create_a_team\']',
    teamName: 'input[data-testid=\'team_name\']',
    teamDescription: 'textarea[data-testid=\'description_team\']',
    createTeamBtn: 'button[data-testid=\'create_team_btn\']',
    teamSettings: 'a[data-testid=\'team_settings\']',
    administrateTeamMembers: 'a[data-testid=\'administrate_team_members\']',
    selectTeamMembers: 'select[data-testid=\'select_team_members_add\']',
    // team internal options
    filesTab: 'div[data-testid=\'team_files\']',
    newsTab: 'div[data-testid=\'teams_news\']',
    appointmentsTab: 'div[data-testid=\'team_events\']',

    // team events:
    appointmentsTab: 'input[data-testid=\'team_event_name\']',
    descriptionTeamEvent: 'input[data-testid=\'description_team_event\']',
    locationTeamEvent: 'input[data-testid=\'team_event_location\']',
    
    


    




}
