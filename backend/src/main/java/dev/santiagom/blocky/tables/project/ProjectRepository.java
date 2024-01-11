package dev.santiagom.blocky.tables.project;

import dev.santiagom.blocky.tables.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM dev.santiagom.blocky.tables.project.Project p WHERE p.user = :user")
    List<Project> findAllByUser(@Param("user") User user);
}
